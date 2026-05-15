import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Exports a DOM element to a PDF file.
 * @param elementId The ID of the HTML element to capture.
 * @param fileName The name of the resulting PDF file.
 */
export const exportElementToPDF = async (elementId: string, fileName: string = 'report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return;
  }

  try {

    // Capture the element as a high-quality JPEG
    // html-to-image is much better with modern CSS (oklab, tailwind v4, etc.)
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2, // Equivalent to scale in html2canvas
      backgroundColor: '#f9fafb',
      style: {
        borderRadius: '0', // Optional: flatten corners for PDF
        padding: '24px'
      }
    });

    // Calculate PDF dimensions
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Image sizing to fit A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    // Assuming we want to maintain aspect ratio and fit to width
    const img = new Image();
    img.src = dataUrl;
    
    // Wait for image to load to get dimensions
    await new Promise((resolve) => {
        img.onload = resolve;
    });

    const pdfHeight = (img.height * pdfWidth) / img.width;

    // Add image to PDF
    pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    
    // Save the PDF
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('[PDF Export] Critical error during PDF generation:', error);
    throw error;
  }
};
