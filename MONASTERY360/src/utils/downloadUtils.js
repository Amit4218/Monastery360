import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateDetailedReport = async (item, options = {}) => {
  const {
    includeImages = true,
    includeSpiritual = true,
    includeHistorical = true,
    includeCultural = true,
    includeConservation = true
  } = options;

  // Create PDF document
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add text with word wrapping
  const addWrappedText = (text, x, y, maxWidth, fontSize = 10) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.5);
  };

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(item.title, 20, yPosition);
  yPosition += 15;

  // Subtitle
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${item.monastery} • ${item.date}`, 20, yPosition);
  yPosition += 15;

  // Add image if available and requested
  if (includeImages && item.image) {
    try {
      const imgData = await getImageDataURL(item.image);
      const imgWidth = 80;
      const imgHeight = 60;
      pdf.addImage(imgData, 'JPEG', 20, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 10;
    } catch (error) {
      console.warn('Failed to add image to PDF:', error);
    }
  }

  // Basic Information Section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Basic Information', 20, yPosition);
  yPosition += 10;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  const basicInfo = [
    `Type: ${item.type || 'N/A'}`,
    `Category: ${item.category || 'N/A'}`,
    `Date: ${item.date || 'N/A'}`,
    `Monastery: ${item.monastery || 'N/A'}`,
    `Views: ${item.views?.toLocaleString() || 'N/A'}`,
    `Material: ${item.material || 'N/A'}`,
    `Condition: ${item.condition || 'N/A'}`,
    `Language: ${item.language || 'N/A'}`,
    `Pages: ${item.pages || 'N/A'}`,
    `Dimensions: ${item.dimensions || 'N/A'}`,
    `Weight: ${item.weight || 'N/A'}`,
  ].filter(info => !info.includes('N/A'));

  basicInfo.forEach(info => {
    pdf.text(info, 25, yPosition);
    yPosition += 5;
  });

  yPosition += 5;

  // Description Section
  if (item.description) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Description', 20, yPosition);
    yPosition += 10;

    yPosition = addWrappedText(item.description, 20, yPosition, pageWidth - 40, 10);
    yPosition += 10;
  }

  // Spiritual Context Section
  if (includeSpiritual && item.significance) {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Spiritual Context & Significance', 20, yPosition);
    yPosition += 10;

    yPosition = addWrappedText(item.significance, 20, yPosition, pageWidth - 40, 10);
    yPosition += 10;

    // Add spiritual practices if available
    if (item.spiritualPractices) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Associated Spiritual Practices:', 20, yPosition);
      yPosition += 7;

      item.spiritualPractices.forEach(practice => {
        yPosition = addWrappedText(`• ${practice}`, 25, yPosition, pageWidth - 50, 10);
        yPosition += 2;
      });
      yPosition += 5;
    }
  }

  // Historical Context Section
  if (includeHistorical && item.historicalContext) {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Historical Context', 20, yPosition);
    yPosition += 10;

    yPosition = addWrappedText(item.historicalContext, 20, yPosition, pageWidth - 40, 10);
    yPosition += 10;
  }

  // Cultural Impact Section
  if (includeCultural && item.culturalImpact) {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Cultural Impact & Legacy', 20, yPosition);
    yPosition += 10;

    yPosition = addWrappedText(item.culturalImpact, 20, yPosition, pageWidth - 40, 10);
    yPosition += 10;
  }

  // Conservation Section
  if (includeConservation && item.conservationNotes) {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Conservation Status & Notes', 20, yPosition);
    yPosition += 10;

    yPosition = addWrappedText(item.conservationNotes, 20, yPosition, pageWidth - 40, 10);
    yPosition += 10;
  }

  // Technical Details Section
  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Technical Details', 20, yPosition);
  yPosition += 10;

  const technicalDetails = [
    `File Size: ${item.fileSize || 'N/A'}`,
    `Resolution: ${item.resolution || 'N/A'}`,
    `Format: ${item.format || 'N/A'}`,
    `Access Level: ${item.accessLevel || 'Public'}`,
    `Download Count: ${item.downloadCount || '0'}`,
    `Last Updated: ${new Date().toLocaleDateString()}`,
  ].filter(detail => !detail.includes('N/A'));

  technicalDetails.forEach(detail => {
    pdf.text(detail, 25, yPosition);
    yPosition += 5;
  });

  // Footer
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(
      `Monastery360 Digital Archives - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    pdf.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      pageWidth - 20,
      pageHeight - 10,
      { align: 'right' }
    );
  }

  return pdf;
};

// Helper function to convert image to data URL
const getImageDataURL = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
};

// Function to download complete archive details
export const downloadArchiveDetails = async (item, format = 'pdf') => {
  try {
    if (format === 'pdf') {
      const pdf = await generateDetailedReport(item, {
        includeImages: true,
        includeSpiritual: true,
        includeHistorical: true,
        includeCultural: true,
        includeConservation: true
      });
      
      pdf.save(`${item.title.replace(/[^a-z0-9]/gi, '_')}_complete_details.pdf`);
    } else if (format === 'json') {
      const data = {
        ...item,
        exportedAt: new Date().toISOString(),
        exportedBy: 'Monastery360 Platform'
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.title.replace(/[^a-z0-9]/gi, '_')}_data.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to generate download. Please try again.');
  }
};

// Function to download high-resolution image
export const downloadHighResImage = async (item) => {
  try {
    const response = await fetch(item.image);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.title.replace(/[^a-z0-9]/gi, '_')}_high_res.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Image download failed:', error);
    throw new Error('Failed to download image. Please try again.');
  }
};