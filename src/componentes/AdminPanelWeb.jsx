import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Trophy, Settings, Calendar, Menu, ChevronRight } from 'lucide-react';
import './AdminPanelWeb.css';

export default function AdminPanelWeb() {
  const [currentSection, setCurrentSection] = useState('leagues');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [leagues, setLeagues] = useState([
    { id: 1, name: 'Liga Premier 2024', type: 'Profesional', startDate: '2024-01-15', endDate: '2024-06-30', teams: 16, status: 'En Curso', prize: '$50,000', color: '#2776F5' },
    { id: 2, name: 'Copa Libertadores', type: 'Torneo', startDate: '2024-02-01', endDate: '2024-11-30', teams: 32, status: 'Inscripción', prize: '$100,000', color: '#27F5AD' },
    { id: 3, name: 'Liga Amateur', type: 'Amateur', startDate: '2024-03-10', endDate: '2024-08-15', teams: 8, status: 'Programada', prize: '$5,000', color: '#27F5F1' },
    { id: 4, name: 'Champions League', type: 'Profesional', startDate: '2024-05-01', endDate: '2024-12-31', teams: 24, status: 'En Curso', prize: '$200,000', color: '#2735F5' },
  ]);

  const menuSections = [
    { id: 'leagues', label: 'Ligas', icon: Trophy, color: '#2735F5' },
  ];

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    
    if (item) {
      setFormData({
        name: item.name,
        type: item.type,
        startDate: item.startDate,
        endDate: item.endDate,
        teams: item.teams,
        status: item.status,
        prize: item.prize
      });
    } else {
      setFormData({
        name: '',
        type: 'Profesional',
        startDate: '',
        endDate: '',
        teams: 8,
        status: 'Programada',
        prize: ''
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta liga?')) {
      setLeagues(leagues.filter(l => l.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    if (modalType === 'create') {
      const colors = ['#2776F5', '#27F5AD', '#2787F5', '#27F5F1', '#2735F5', '#78CFF5'];
      const newLeague = {
        id: leagues.length + 1,
        ...formData,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setLeagues([...leagues, newLeague]);
    } else {
      setLeagues(leagues.map(l => l.id === selectedItem.id ? { ...l, ...formData } : l));
    }
    closeModal();
  };

  const getStatusColor = (status) => {
    if (status === 'Activo' || status === 'En Curso') return '#27F5AD';
    if (status === 'Inactivo' || status === 'Finalizada') return '#78CFF5';
    if (status === 'Lesionado') return '#F52757';
    if (status === 'Inscripción' || status === 'Programada') return '#2776F5';
    return '#78CFF5';
  };

  const getPositionColor = (position) => {
    if (position === 'Delantero') return '#27F5AD';
    if (position === 'Mediocampista') return '#2776F5';
    if (position === 'Defensa') return '#2735F5';
    if (position === 'Portero') return '#27F5F1';
    return '#78CFF5';
  };

  const renderLeagues = () => {
    const filteredLeagues = leagues.filter(league => 
      league.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="leagues-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Gestión de Ligas</h2>
            <p className="section-description">Administra todas las ligas y torneos</p>
          </div>
          <button
            onClick={() => openModal('create')}
            className="create-button"
            style={{ 
              background: 'linear-gradient(135deg, #2735F5 0%, #2776F5 100%)',
            }}
          >
            <Plus size={20} />
            Nueva Liga
          </button>
        </div>

        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar ligas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="leagues-grid">
          {filteredLeagues.map((league) => (
            <div 
              key={league.id}
              className="league-card"
            >
              <div className="league-card-header">
                <div 
                  className="league-icon"
                  style={{ background: `linear-gradient(135deg, ${league.color} 0%, ${league.color}cc 100%)` }}
                >
                  <Trophy size={36} color="#fff" />
                </div>
                <div className="league-info">
                  <h3 className="league-name">{league.name}</h3>
                  <div className="league-dates">
                    <Calendar size={14} />
                    <span>{league.startDate}</span>
                    <span>→</span>
                    <span>{league.endDate}</span>
                  </div>
                  <div className="league-stats">
                    <span className="league-teams-badge">
                      {league.teams} equipos
                    </span>
                    <span className="league-prize">
                      {league.prize}
                    </span>
                  </div>
                </div>
              </div>

              <div className="league-card-tags">
                <span className="league-tag type">
                  {league.type}
                </span>
                <span 
                  className="league-tag status"
                  style={{ 
                    background: `${getStatusColor(league.status)}20`,
                    color: getStatusColor(league.status),
                    borderColor: `${getStatusColor(league.status)}40`
                  }}
                >
                  {league.status}
                </span>
              </div>

              <div className="league-card-actions">
                <button 
                  onClick={() => openModal('edit', league)}
                  className="league-edit-btn"
                >
                  <Edit2 size={18} />
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(league.id)}
                  className="league-delete-btn"
                >
                  <Trash2 size={20} color="#F52757" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div 
        className="modal-overlay"
        onClick={closeModal}
      >
        <div 
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2 className="modal-title">
              {modalType === 'create' ? 'Crear Liga' : 'Editar Liga'}
            </h2>
            <button 
              onClick={closeModal}
              className="modal-close-btn"
            >
              <X size={20} color="#78CFF5" />
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">
                Nombre de la Liga
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="Liga Premier 2024"
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">
                  Tipo de Liga
                </label>
                <select
                  value={formData.type || 'Profesional'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="form-select"
                >
                  <option value="Profesional" style={{ background: '#0a0f1e' }}>Profesional</option>
                  <option value="Amateur" style={{ background: '#0a0f1e' }}>Amateur</option>
                  <option value="Torneo" style={{ background: '#0a0f1e' }}>Torneo</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Estado
                </label>
                <select
                  value={formData.status || 'Programada'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-select"
                >
                  <option value="Programada" style={{ background: '#0a0f1e' }}>Programada</option>
                  <option value="Inscripción" style={{ background: '#0a0f1e' }}>Inscripción</option>
                  <option value="En Curso" style={{ background: '#0a0f1e' }}>En Curso</option>
                  <option value="Finalizada" style={{ background: '#0a0f1e' }}>Finalizada</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">
                  Número de Equipos
                </label>
                <input
                  type="number"
                  value={formData.teams || ''}
                  onChange={(e) => setFormData({ ...formData, teams: e.target.value })}
                  className="form-input"
                  placeholder="16"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Premio
                </label>
                <input
                  type="text"
                  value={formData.prize || ''}
                  onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                  className="form-input"
                  placeholder="$50,000"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={closeModal}
                className="modal-cancel-btn"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="modal-submit-btn"
              >
                {modalType === 'create' ? 'Crear' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-panel">
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-content">
            {!sidebarCollapsed && (
              <h1 className="sidebar-title">
                Admin Panel
              </h1>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="sidebar-toggle-btn"
            >
              <Menu size={20} color="#27F5F1" />
            </button>
          </div>
          {!sidebarCollapsed && (
            <p className="sidebar-subtitle">Sistema de gestión deportiva</p>
          )}
        </div>

        <div className="sidebar-menu">
          {menuSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setCurrentSection(section.id);
                setSearchTerm('');
              }}
              className={`menu-item ${currentSection === section.id ? 'active' : ''}`}
              style={{ 
                background: currentSection === section.id 
                  ? `linear-gradient(135deg, ${section.color}30 0%, ${section.color}10 100%)`
                  : 'rgba(255, 255, 255, 0.02)',
                border: currentSection === section.id
                  ? `1px solid ${section.color}60`
                  : '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div 
                className="menu-item-icon"
                style={{ 
                  background: currentSection === section.id ? `${section.color}40` : 'rgba(255, 255, 255, 0.05)'
                }}
              >
                <section.icon size={20} color={currentSection === section.id ? section.color : '#78CFF5'} />
              </div>
              {!sidebarCollapsed && (
                <>
                  <span 
                    className="menu-item-label"
                    style={{ 
                      color: currentSection === section.id ? section.color : '#78CFF5',
                    }}
                  >
                    {section.label}
                  </span>
                  {currentSection === section.id && (
                    <ChevronRight size={18} color={section.color} />
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          {!sidebarCollapsed ? (
            <div className="sidebar-footer-card">
              <p className="sidebar-footer-title">Admin Panel v2.0</p>
              <p className="sidebar-footer-text">
                Gestión completa para tu liga deportiva
              </p>
            </div>
          ) : (
            <div className="sidebar-footer-icon-wrapper">
              <Settings size={20} color="#27F5F1" />
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="header-content">
            <div>
              <h2 className="header-title">
                {menuSections.find(s => s.id === currentSection)?.label || 'Ligas'}
              </h2>
              <p className="header-subtitle">
                {currentSection === 'leagues' && 'Controla ligas y torneos'}
              </p>
            </div>
            {currentSection === 'leagues' && (
              <button
                onClick={() => openModal('create')}
                className="header-button"
                style={{ 
                  background: `linear-gradient(135deg, ${menuSections.find(s => s.id === currentSection)?.color} 0%, ${menuSections.find(s => s.id === currentSection)?.color}cc 100%)`,
                  color: '#fff',
                  boxShadow: `0 8px 24px ${menuSections.find(s => s.id === currentSection)?.color}40`
                }}
              >
                <Plus size={20} />
                Crear Nuevo
              </button>
            )}
          </div>
        </div>

        <div className="content-area">
          {currentSection === 'leagues' && renderLeagues()}
        </div>
      </div>

      {renderModal()}
    </div>
  );
}