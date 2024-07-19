CREATE TABLE IF NOT EXISTS medicos (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    crm VARCHAR(20) NOT NULL UNIQUE,
    especialidade VARCHAR(100) NOT NULL,
    avaliacao INT NOT NULL,
    distancia INT NOT NULL,
    disponibilidade BOOLEAN NOT NULL
);

INSERT INTO medicos values (
    '06f46f66-9f2e-4a27-976c-fa785936a765',
    'ARAO ANDRADE NAPOLEAO LIMA',
    '194528-SP',
    'DERMATOLOGIA',
    9,
    10,
    true
);

INSERT INTO medicos values (
    '6bf977c6-f120-473d-8f00-97e2b5f8b18a',
    'ARON DA COSTA TELLES',
    '202768-SP',
    'ANESTESIOLOGIA',
    8,
    5,
    true
);

INSERT INTO medicos values (
    '87299678-a39f-46ff-a849-79c35f561945',
    'BRUNO LOPES DOS SANTOS',
    '127670-SP',
    'NEUROLOGIA',
    5,
    2,
    true
);

INSERT INTO medicos values (
    '3fb50be0-b77b-4f9f-8288-adcccb79a234',
    'JARBAS CAMARGO BARBOSA DE BARROS',
    '2364-SP',
    'UROLOGIA',
    7,
    30,
    true
);

INSERT INTO medicos values (
    '107622f8-3f6a-4506-b863-5a8740a94f8f',
    'JOSE FRANCISCO GONCALVES FILHO',
    '42296-SP',
    'GINECOLOGIA E OBSTETRÍCIA',
    3,
    15,
    false
);
