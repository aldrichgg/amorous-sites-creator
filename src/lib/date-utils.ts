
/**
 * Utility functions for date operations
 */

// Format date for display
export const formatDateForDisplay = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
};

// Calculate time difference including days, hours, minutes, seconds
export const formatTimeDifference = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  
  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  
  // Format the string
  return `${days} ${days === 1 ? 'dia' : 'dias'}, ${hours} ${hours === 1 ? 'hora' : 'horas'}, ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} e ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
};
