-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for storing system prompts and their sources
CREATE TABLE system_prompts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for storing uploaded documents
CREATE TABLE documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500),
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER,
    extracted_text TEXT,
    url VARCHAR(500),
    plain_text TEXT,
    status VARCHAR(50) DEFAULT 'processing',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for dynamic website content
CREATE TABLE website_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_key VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255),
    content JSONB NOT NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for linking documents to system prompts
CREATE TABLE prompt_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    prompt_id UUID REFERENCES system_prompts(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default system prompt
INSERT INTO system_prompts (name, content, is_active) VALUES (
    'Default JTI Assistant',
    'Anda adalah AI Assistant untuk Jurusan Teknologi Informasi Universitas Tadulako (JTI UNTAD)...',
    true
);

-- Insert default website content
INSERT INTO website_content (page_key, title, content) VALUES 
('homepage_hero', 'Hero Section', '{
    "title": "Selamat Datang di Portal Administrasi",
    "subtitle": "Jurusan Teknologi Informasi Universitas Tadulako",
    "description": "Temukan semua informasi administrasi yang Anda butuhkan. Dari panduan mahasiswa baru, prosedur akademik, hingga bantuan AI yang siap membantu 24/7."
}'),
('quick_access', 'Quick Access Menu', '{
    "items": [
        {"title": "Kalender Akademik", "icon": "Calendar", "href": "/kalender"},
        {"title": "Formulir & Dokumen", "icon": "FileText", "href": "/formulir"},
        {"title": "Beasiswa", "icon": "Award", "href": "/beasiswa"},
        {"title": "Pengaturan AI", "icon": "Settings", "href": "/admin"}
    ]
}');

-- Create indexes for better performance
CREATE INDEX idx_system_prompts_active ON system_prompts(is_active);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_website_content_published ON website_content(is_published);
