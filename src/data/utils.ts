
// Simulate API calls with console logging
export const simulateApiCall = (endpoint: string, data: any = null): Promise<any> => {
  console.log(`API Call to: ${endpoint}`, data ? { data } : "");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`API Response from: ${endpoint}`, { success: true });
      resolve({ success: true });
    }, 800);
  });
};
