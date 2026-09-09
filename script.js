const imageInput = document.getElementById('imageInput');
const gallery = document.getElementById('gallery');
const photoCount = document.getElementById('photoCount');

function updatePhotoCount() {
  const images = gallery.querySelectorAll('.photo-card').length;
  photoCount.textContent = `${images} image${images === 1 ? '' : 's'}`;
}

function createImageCard(file) {
  const url = URL.createObjectURL(file);
  const card = document.createElement('article');
  card.className = 'photo-card';

  const img = document.createElement('img');
  img.src = url;
  img.alt = file.name;

  const body = document.createElement('div');
  body.className = 'card-body';

  const name = document.createElement('span');
  name.className = 'photo-name';
  name.textContent = file.name;

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'action-button download-btn';
  downloadBtn.type = 'button';
  downloadBtn.textContent = 'Download';
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  const removeBtn = document.createElement('button');
  removeBtn.className = 'action-button remove-btn';
  removeBtn.type = 'button';
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    URL.revokeObjectURL(url);
    card.remove();
    updatePhotoCount();
  });

  actions.append(downloadBtn, removeBtn);
  body.append(name, actions);
  card.append(img, body);

  return card;
}

function showEmptyState() {
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  empty.textContent = 'No photos uploaded yet. Add some images to get started.';
  gallery.appendChild(empty);
}

function clearEmptyState() {
  const empty = gallery.querySelector('.empty-state');
  if (empty) empty.remove();
}

imageInput.addEventListener('change', (event) => {
  const files = Array.from(event.target.files || []);
  const validImages = files.filter((file) => file.type.startsWith('image/'));

  if (validImages.length === 0) {
    return;
  }

  clearEmptyState();

  validImages.forEach((file) => {
    gallery.appendChild(createImageCard(file));
  });

  updatePhotoCount();
  imageInput.value = '';
});

showEmptyState();
updatePhotoCount();
