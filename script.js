// CONFIGURACIÓN: Ingresa tu número de WhatsApp de Uruguay (ej: 59899123456)
const NUMERO_WHATSAPP = "097305438";

function initUrbancell() {
    // 1. Obtiene o crea el código único almacenado en el dispositivo del cliente
    let code = localStorage.getItem('urbancell_code');

    if (!code) {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        code = `URBAN-${randomNum}`;
        localStorage.setItem('urbancell_code', code);
    }

    // 2. Muestra el código en pantalla
    const codeElem = document.getElementById('discountCode');
    if (codeElem) {
        codeElem.textContent = code;
    }

    // 3. Prepara el enlace directo a WhatsApp con el mensaje pre-escrito
    const wsBtn = document.getElementById('wsLink');
    if (wsBtn) {
        const message = `¡Hola Urbancell! Escaneé el QR. Mi código único de 15% de descuento es: *${code}*. Quería consultar por accesorios e ingresar mi opinión.`;
        wsBtn.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`;
    }

    // 4. Funcionalidad del botón Copiar Código
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(code).then(() => {
                const copyText = document.getElementById('copyText');
                const originalText = copyText.textContent;

                copyText.textContent = '¡Copiado! 🎉';
                copyBtn.style.borderColor = '#10b981';
                copyBtn.style.color = '#10b981';

                setTimeout(() => {
                    copyText.textContent = originalText;
                    copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    copyBtn.style.color = 'var(--text-light)';
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar el código:', err);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initUrbancell);