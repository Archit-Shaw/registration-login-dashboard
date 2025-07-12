 const email = sessionStorage.getItem('loggedInUser');
    if (!email) {
      alert('Please login first.');
      window.location = 'login.html';
    } else {
      const u = JSON.parse(localStorage.getItem('users')).find(u => u.email === email);
      if (!u) { alert('User not found'); sessionStorage.removeItem('loggedInUser'); window.location = 'login.html'; }
      document.getElementById('pic').src = u.pic;
      document.getElementById('name').textContent = u.fullName;
      document.getElementById('em').textContent = u.email;
      document.getElementById('ph').textContent = u.phone;
      document.getElementById('gn').textContent = u.gender;
      document.getElementById('db').textContent = u.dob;
      document.getElementById('ad').textContent = u.address;
      document.getElementById('ct').textContent = u.city;
      document.getElementById('sk').textContent = u.skills.join(', ');
    }

    document.getElementById('loBtn').addEventListener('click', () => {
      sessionStorage.removeItem('loggedInUser');
      window.location.href = "../login/login.html";
    });