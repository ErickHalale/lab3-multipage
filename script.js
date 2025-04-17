// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Check for saved theme preference
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            // Save preference to localStorage
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill out all fields.');
            } else {
                // Remove any existing response message
                const existingResponse = document.getElementById('response');
                if (existingResponse) {
                    existingResponse.remove();
                }

                const responseDiv = document.createElement('div');
                responseDiv.id = 'response';
                responseDiv.textContent = `Thanks, ${name}. We'll get back to you soon!`;
                responseDiv.style.marginTop = '1rem';
                responseDiv.style.padding = '1rem';
                responseDiv.style.backgroundColor = '#e8f5e9';
                responseDiv.style.borderRadius = '5px';
                responseDiv.style.color = '#2e7d32';
                contactForm.parentNode.insertBefore(responseDiv, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
            }
        });
    }

    // Fetch API Integration with styled button
    const loadUsersBtn = document.getElementById('loadUsersBtn');
    if (loadUsersBtn) {
        // Apply base button styles
        loadUsersBtn.style.cssText = `
            padding: 10px 20px;
            background-color: #4285f4;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;

        // Add hover effect
        loadUsersBtn.addEventListener('mouseenter', () => {
            loadUsersBtn.style.backgroundColor = '#3367d6';
            loadUsersBtn.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
        });

        loadUsersBtn.addEventListener('mouseleave', () => {
            loadUsersBtn.style.backgroundColor = '#4285f4';
            loadUsersBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });

        // Add active/click effect
        loadUsersBtn.addEventListener('mousedown', () => {
            loadUsersBtn.style.transform = 'translateY(1px)';
        });

        loadUsersBtn.addEventListener('mouseup', () => {
            loadUsersBtn.style.transform = 'translateY(0)';
        });

        loadUsersBtn.addEventListener('click', async () => {
            try {
                loadUsersBtn.disabled = true;
                loadUsersBtn.textContent = 'Loading...';
                loadUsersBtn.style.opacity = '0.8';
                loadUsersBtn.style.cursor = 'wait';
                
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                const users = await res.json();
                const userList = document.getElementById('userList');
                userList.innerHTML = '';
                
                // Style the user list
                userList.style.listStyle = 'none';
                userList.style.padding = '0';
                userList.style.marginTop = '20px';
                
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user.name;
                    // Style list items
                    li.style.cssText = `
                        padding: 10px 15px;
                        margin: 8px 0;
                        background-color: #f8f9fa;
                        border-radius: 4px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        transition: background-color 0.2s;
                    `;
                    
                    // Add hover effect to list items
                    li.addEventListener('mouseenter', () => {
                        li.style.backgroundColor = '#e9ecef';
                    });
                    
                    li.addEventListener('mouseleave', () => {
                        li.style.backgroundColor = '#f8f9fa';
                    });
                    
                    userList.appendChild(li);
                });
            } catch (err) {
                console.error('Failed to load users:', err);
                alert('Failed to load users. Please try again later.');
            } finally {
                loadUsersBtn.disabled = false;
                loadUsersBtn.textContent = 'Load Team Members';
                loadUsersBtn.style.opacity = '1';
                loadUsersBtn.style.cursor = 'pointer';
            }
        });
    }

    // FAQ Toggle Functionality
    document.querySelectorAll('.question').forEach((q) => {
        q.addEventListener('click', () => {
            q.classList.toggle('active');
            q.nextElementSibling.classList.toggle('visible');
        });
    });
});