import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SkipToContentLink = () => {
  const { t } = useLanguage();

  return (
    <a href="#main-content" className="skip-link">
      {t('accessibility.skipToContent')}
    </a>
  );
};

export default SkipToContentLink;
