// ============================================================
// EMAILJS BOOKING FORM HANDLER
// ============================================================

async function submitBooking(e) {
    e.preventDefault();
    
    const d = getData();
    const ejs = d.site.emailjs || {};
    const btn = document.getElementById('submit-btn');
    const errEl = document.getElementById('form-error');
    const successEl = document.getElementById('form-success');

    if (errEl) errEl.style.display = 'none';

    // Validate form fields
    const fname = document.getElementById('bf-fname');
    const lname = document.getElementById('bf-lname');
    const phone = document.getElementById('bf-phone');
    const email = document.getElementById('bf-email');
    
    if (!fname || !fname.value.trim()) {
        if (errEl) {
            errEl.style.display = 'block';
            errEl.textContent = '⚠️ First name is required.';
        }
        return;
    }
    
    if (!lname || !lname.value.trim()) {
        if (errEl) {
            errEl.style.display = 'block';
            errEl.textContent = '⚠️ Last name is required.';
        }
        return;
    }
    
    if (!phone || !phone.value.trim()) {
        if (errEl) {
            errEl.style.display = 'block';
            errEl.textContent = '⚠️ Phone number is required.';
        }
        return;
    }
    
    if (!email || !email.value.trim() || !email.value.includes('@')) {
        if (errEl) {
            errEl.style.display = 'block';
            errEl.textContent = '⚠️ Valid email is required.';
        }
        return;
    }

    // Validate EmailJS config
    if (!ejs.serviceId || !ejs.templateId || !ejs.publicKey || !ejs.recipientEmail) {
        if (errEl) {
            errEl.style.display = 'block';
            errEl.textContent = '⚠️ Email not configured yet. Please set up EmailJS in Admin → Email Settings.';
        }
        return;
    }

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        if (errEl) {
            errEl.style.display = 'block';
            errEl.textContent = '⚠️ Email service not loaded. Please check your internet connection.';
        }
        return;
    }

    if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
        btn.style.opacity = '0.7';
    }

    try {
        emailjs.init(ejs.publicKey);
        
        const params = {
            to_email: ejs.recipientEmail,
            from_name: fname.value.trim() + ' ' + lname.value.trim(),
            from_email: email.value.trim(),
            phone: phone.value.trim(),
            service: document.getElementById('bf-service') ? document.getElementById('bf-service').value || 'Not specified' : 'Not specified',
            preferred_date: document.getElementById('bf-date') ? document.getElementById('bf-date').value || 'Not specified' : 'Not specified',
            preferred_time: document.getElementById('bf-time') ? document.getElementById('bf-time').value || 'Not specified' : 'Not specified',
            message: document.getElementById('bf-message') ? document.getElementById('bf-message').value || 'No message' : 'No message',
        };
        
        await emailjs.send(ejs.serviceId, ejs.templateId, params);
        
        if (successEl) successEl.classList.add('show');
        
        // Reset form
        const form = document.getElementById('booking-form');
        if (form) form.reset();
        
        if (btn) btn.style.display = 'none';
        
    } catch (err) {
        console.error('EmailJS error:', err);
        if (errEl) {
            errEl.style.display = 'block';
            errEl.textContent = '❌ Failed to send: ' + (err.text || err.message || 'Unknown error. Check your EmailJS settings.');
        }
        if (btn) {
            btn.textContent = 'Submit ⟶';
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    }
}