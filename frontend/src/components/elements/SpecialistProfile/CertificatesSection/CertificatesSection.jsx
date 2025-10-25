import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CertificatesSection.css';

const CertificatesSection = ({ certificates = [], onCertificatesChange }) => {
  const { t } = useTranslation();
  const [newCertificateText, setNewCertificateText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCertificate = () => {
    const trimmedText = newCertificateText.trim();
    if (!trimmedText) return;

    const newCertificate = {
      id: Date.now(),
      name: trimmedText,
      type: 'text'
    };

    const updatedCertificates = [...certificates, newCertificate];
    onCertificatesChange(updatedCertificates);
    setNewCertificateText('');
    setIsAdding(false);
  };

  const handleRemoveCertificate = (certificateId) => {
    const updatedCertificates = certificates.filter(cert => cert.id !== certificateId);
    onCertificatesChange(updatedCertificates);
  };

  const startAdding = () => {
    setIsAdding(true);
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setNewCertificateText('');
  };

  return (
    <div className="sp-certificates-section">
      <h3>{t('sp_certificates')}</h3>
      
      {/* Відображення сертифікатів як чіпси */}
      <div className="sp-certificates-list">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="sp-certificate-item">
            <span>{certificate.name}</span>
            <button 
              className="sp-certificate-remove" 
              onClick={() => handleRemoveCertificate(certificate.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {/* Поле для додавання нового сертифіката */}
      {isAdding ? (
        <div className="sp-certificate-input-wrapper">
          <input
            type="text"
            className="sp-certificate-text-input"
            value={newCertificateText}
            onChange={(e) => setNewCertificateText(e.target.value)}
            placeholder={t('sp_certificate_placeholder')}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddCertificate();
              if (e.key === 'Escape') cancelAdding();
            }}
          />
          <div className="sp-certificate-actions">
            <button 
              className="sp-add-certificate-confirm" 
              onClick={handleAddCertificate}
              disabled={!newCertificateText.trim()}
            >
              {t('sp_add_button')}
            </button>
            <button 
              className="sp-add-certificate-cancel" 
              onClick={cancelAdding}
            >
              {t('sp_cancel_button')}
            </button>
          </div>
        </div>
      ) : (
        <button className="sp-add-certificate-button" onClick={startAdding}>
          {t('sp_add_certificate')} +
        </button>
      )}
    </div>
  );
};

export default CertificatesSection;
