import { chromium } from 'playwright';

const main = async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navegar para a página
    await page.goto('http://localhost:3000');
    
    // Fazer upload do arquivo
    const fileInput = page.locator('#fileInput');
    await fileInput.setInputFiles('propostas.xlsx');
    
    console.log('Upload realizado com sucesso!');
    
    // Esperar 1 segundo e tirar screenshot
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'upload_screenshot.png' });
    console.log('Screenshot salvo como upload_screenshot.png');
  } catch (error) {
    console.error('Erro durante a automação:', error);
  } finally {
    await browser.close();
  }
};

export default main;