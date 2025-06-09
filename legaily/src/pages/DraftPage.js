import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import './DraftPage.css';

const templates = [
  'Legal Notice',
  'Bail Application',
  'Affidavit',
  'Contract',
  'PIL (Public Interest Litigation)'
];

const fieldMap = {
  'Legal Notice': ['partyName', 'location', 'caseDetails'],
  'Bail Application': ['partyName', 'location', 'caseDetails', 'date'],
  'Affidavit': ['partyName', 'location', 'caseDetails', 'date'],
  'Contract': ['partyName', 'otherParty', 'location', 'caseDetails', 'date'],
  'PIL (Public Interest Litigation)': ['partyName', 'location', 'caseDetails', 'date']
};

const templateTextMap = {
  'Legal Notice': `
To,  
[partyName]  
[location]  

Subject: Legal Notice regarding [caseDetails]

Dear Sir/Madam,

This is to formally notify you about the legal concern mentioned above. Please treat this matter with urgency.

Sincerely,  
[partyName]
`,
  'Bail Application': `
To,  
The Hon’ble Court

Subject: Application for Bail

Respected Sir/Madam,

I, [partyName], hereby request the grant of bail in the matter of [caseDetails], registered at [location] on [date].

Thank you,  
[partyName]
`,
  'Affidavit': `
AFFIDAVIT

I, [partyName], do hereby solemnly affirm that:

1. I am residing in [location].
2. The facts related to [caseDetails] are true to the best of my knowledge.

Dated: [date]  
[partyName]
`,
  'Contract': `
CONTRACT AGREEMENT

This agreement is made on [date] between [partyName] and [otherParty] regarding [caseDetails].

Both parties agree to the terms stated hereafter. This agreement is effective from the date mentioned and is enforceable by law.

Location: [location]

Signed,  
[partyName]  
[otherParty]
`,
  'PIL (Public Interest Litigation)': `
PUBLIC INTEREST LITIGATION

Filed by: [partyName]  
Location: [location]  
Date: [date]

Subject: [caseDetails]

This PIL is submitted in the interest of public welfare in accordance with Article 32 of the Indian Constitution.
`
};

const Drafts = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({
    partyName: '',
    location: '',
    otherParty: '',
    caseDetails: '',
    date: ''
  });
  const [draftOutput, setDraftOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateDraft = () => {
    setIsLoading(true);

    setTimeout(() => {
      const filledTemplate = (templateTextMap[selectedTemplate] || '[Template not available]')
        .replaceAll('[partyName]', formData.partyName.trim())
        .replaceAll('[location]', formData.location.trim())
        .replaceAll('[otherParty]', formData.otherParty.trim())
        .replaceAll('[caseDetails]', formData.caseDetails.trim())
        .replaceAll('[date]', formData.date);

      const finalDraft = `📄 Draft: ${selectedTemplate}\n\n${filledTemplate}`;
      setDraftOutput(finalDraft);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!isLoading && draftOutput) {
      window.scrollTo(0, 0);
    }
  }, [isLoading, draftOutput]);

  const downloadPDF = () => {
    const element = document.getElementById('draftPreview');
    html2pdf().set({
      margin: 1,
      filename: `${selectedTemplate.replace(/\s+/g, '_')}_Draft.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(element).save();
  };

  const renderInput = (field) => {
    const labels = {
      partyName: "Party Name",
      location: "Location",
      otherParty: "Other Party",
      caseDetails: "Case Details",
      date: "Date"
    };

    return (
      <div className="form-group" key={field}>
        <label>{labels[field]}</label>
        {field === 'caseDetails' ? (
          <textarea
            rows={6}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            placeholder={`Enter ${labels[field]}`}
          />
        ) : (
          <input
            type={field === 'date' ? 'date' : 'text'}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            placeholder={`Enter ${labels[field]}`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="drafts-container">
      {isLoading && (
        <div className="full-screen-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <h1>📄 Legal Draft Generator</h1>

      <div className="form-group">
        <label>Select Template</label>
        <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
          <option value="">-- Choose Template --</option>
          {templates.map((template, idx) => (
            <option key={idx} value={template}>{template}</option>
          ))}
        </select>
      </div>

      {selectedTemplate && (
        <div className="form-section">
          {fieldMap[selectedTemplate].map(renderInput)}
        </div>
      )}

      <button className="generate-btn" onClick={handleGenerateDraft} disabled={!selectedTemplate}>
        Generate Draft
      </button>

      {draftOutput && (
        <>
          <div id="draftPreview" className="preview-box" contentEditable suppressContentEditableWarning>
            {draftOutput}
          </div>
          <button className="download-btn" onClick={downloadPDF}>Download as PDF</button>
        </>
      )}
    </div>
  );
};

export default Drafts;
