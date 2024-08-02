document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/view_users')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('users-table-body');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.gender}</td>
                    <td>${user.mobile}</td>
                    <td>${user.email}</td>
                    <td><img src="/api/user_image/${user.id}" alt="${user.name}" /></td>
                    <td><button onclick="deleteUser(${user.id})">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => console.error('Error fetching users:', err));
});

function deleteUser(userId) {
    fetch(`/api/delete_user/${userId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                location.reload(); // Reload the page to reflect the changes
            } else {
                alert('Failed to delete user');
            }
        })
        .catch(err => console.error('Error deleting user:', err));
}
