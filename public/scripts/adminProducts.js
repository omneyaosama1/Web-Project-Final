document.getElementById('addProductBtn').addEventListener('click', function() {
    openModal('addProductModal');
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openEditModal(id, name, description, cookTime, difficulty, image) {
    document.getElementById('editProductId').value = id;
    document.getElementById('editProductName').value = name;
    document.getElementById('editProductDescription').value = description;
    document.getElementById('editProductDuration').value = cookTime;
    document.getElementById('editProductDifficulty').value = difficulty;
    document.getElementById('editProductImage').value = image;
    openModal('editProductModal');
}