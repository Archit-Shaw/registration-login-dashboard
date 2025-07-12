const form = document.getElementById('regForm');

    // Toggle eye
    document.getElementById('togglePwd').addEventListener('click', () => {
      const pwd = document.getElementById('password');
      pwd.type = pwd.type == 'password' ? 'text' : 'password';
    });

        
    document.getElementById('toggleConfirmPwd').addEventListener('click', () => {
      const confirmPwd = document.getElementById('confirmPwd');
      confirmPwd.type = confirmPwd.type == 'password' ? 'text' : 'password';
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      // Full Name
      const fn = form.fullName.value.trim();
      const fnErr = document.getElementById('errFullName');
      fnErr.style.display = 'none';
      if (fn.length < 3 || /\d/.test(fn) || /(.)\1\1/.test(fn)) {
        fnErr.textContent = 'Min 3 letters, no digits, no same char 3 times';
        fnErr.style.display = 'block'; valid = false;
      }

      // Email
      const email = form.email.value.trim();
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const eErr = document.getElementById('errEmail');
      eErr.style.display = 'none';
      if (!emailRx.test(email)) { eErr.textContent = 'Invalid email'; eErr.style.display = 'block'; valid = false; }

      // Password
      const pwd = form.password.value;
      const pwdErr = document.getElementById('errPwd');
      pwdErr.style.display = 'none';
      if (pwd.length < 8 || !/[A-Z]/.test(pwd) || !/[a-z]/.test(pwd) || !/\d/.test(pwd)) {
        pwdErr.textContent = 'Min 8 chars, upper, lower and number required';
        pwdErr.style.display = 'block'; valid = false;
      }

      // Confirm
      const cp = form.confirmPwd.value;
      const cpErr = document.getElementById('errConfirmPwd');
      cpErr.style.display = 'none';
      if (cp !== pwd) { cpErr.textContent = 'Passwords do not match'; cpErr.style.display = 'block'; valid = false; }

      // Phone
      const ph = form.phone.value.trim();
      const phErr = document.getElementById('errPhone');
      phErr.style.display = 'none';
      if (!/^\d{10}$/.test(ph)) { phErr.textContent = 'Enter exactly 10 digits'; phErr.style.display = 'block'; valid = false; }

      // Gender
      const gen = form.gender.value;
      const gErr = document.getElementById('errGender');
      gErr.style.display = 'none';
      if (!gen) { gErr.textContent = 'Select a gender'; gErr.style.display = 'block'; valid = false; }

      // DOB
      const dob = new Date(form.dob.value);
      const dErr = document.getElementById('errDOB');
      dErr.style.display = 'none';
      const age = (new Date() - dob) / (365 * 24 * 60 * 60 * 1000);
      if (isNaN(age) || age < 18) { dErr.textContent = 'You must be 18+'; dErr.style.display = 'block'; valid = false; }

      // Address
      const addr = form.address.value.trim();
      const aErr = document.getElementById('errAddress');
      aErr.style.display = 'none';
      if (addr.length < 10) { aErr.textContent = 'Min 10 chars'; aErr.style.display = 'block'; valid = false; }

      // City
      const city = form.city.value;
      const cErr = document.getElementById('errCity');
      cErr.style.display = 'none';
      if (!city) { cErr.textContent = 'Select a city'; cErr.style.display = 'block'; valid = false; }

      // Skills
      const skills = Array.from(form.querySelectorAll('input[name=skills]:checked')).map(cb => cb.value);
      const sErr = document.getElementById('errSkills');
      sErr.style.display = 'none';
      if (skills.length < 1) { sErr.textContent = 'Select at least one skill'; sErr.style.display = 'block'; valid = false; }

      // Terms
      const tCheck = form.terms.checked;
      const tErr = document.getElementById('errTerms');
      tErr.style.display = 'none';
      if (!tCheck) { tErr.textContent = 'You must accept terms'; tErr.style.display = 'block'; valid = false; }

      // Profile pic
      const picInput = form.profilePic.files[0];
      const pErr = document.getElementById('errPic');
      pErr.style.display = 'none';
      if (!picInput) { pErr.textContent = 'Upload a profile picture'; pErr.style.display = 'block'; valid = false; }

      if (!valid) return;

      const reader = new FileReader();
      reader.onload = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ fullName: fn, email, password: pwd, phone: ph, gender: gen, dob: form.dob.value, address: addr, city, skills, pic: reader.result });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration Successful! Please login.');
       window.location.href = "../login/login.html";
      };
      reader.readAsDataURL(picInput);
      // window.location.href = "../login/login.html";
    });