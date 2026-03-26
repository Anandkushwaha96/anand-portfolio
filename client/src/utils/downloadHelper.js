export const downloadResume = async () => {
  try {
    console.log('Starting download...');
    
    // Fetch the PDF file
    const response = await fetch('/anand23.pdf');
    
    if (!response.ok) {
      throw new Error('File not found');
    }
    
    // Get the file as blob
    const blob = await response.blob();
    
    // Create a new blob with proper PDF MIME type
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    
    // Create download URL
    const blobUrl = window.URL.createObjectURL(pdfBlob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'Anand_Kumar_Resume.pdf';
    
    // For Android - add these attributes
    link.setAttribute('download', 'Anand_Kumar_Resume.pdf');
    link.setAttribute('target', '_blank');
    
    // Append to body
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
    
    console.log('Download triggered');
    
  } catch (error) {
    console.error('Download error:', error);
    // Fallback: open in new tab
    window.open('/anand23.pdf', '_blank');
  }
};