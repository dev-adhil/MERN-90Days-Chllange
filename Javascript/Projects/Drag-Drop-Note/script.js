let color = document.getElementById('color');
let createBtn = document.getElementById('createBtn');
let list = document.getElementById('list');

window.addEventListener("load", () => {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(noteData => createNote(noteData.text, noteData.color, noteData.top, noteData.left));
});

createBtn.onclick = () => {
  createNote("", color.value, null, null); 
  saveAllNotes();
};

function createNote(textValue, borderColor, top, left) {
  let newNote = document.createElement('div');
  newNote.classList.add('note');
  newNote.innerHTML = `
    <span class="close">x</span>
    <textarea placeholder="Write Content..." rows="10" cols="30"></textarea>
  `;
  
  newNote.style.borderColor = borderColor;

  if (top !== null && left !== null) {
    newNote.style.position = 'absolute';
    newNote.style.top = top + 'px';
    newNote.style.left = left + 'px';
  }

  list.appendChild(newNote);

  let textarea = newNote.querySelector('textarea');
  textarea.value = textValue;

  textarea.addEventListener('input', () => saveAllNotes());

  newNote.querySelector('.close').addEventListener('click', () => {
    newNote.remove();
    saveAllNotes();
  });
}

function saveAllNotes() {
  let allNotes = [];
  document.querySelectorAll('.note').forEach(note => {
    let rect = note.getBoundingClientRect();
    allNotes.push({
      text: note.querySelector('textarea').value,
      color: note.style.borderColor,
      top: parseInt(note.style.top) || rect.top,
      left: parseInt(note.style.left) || rect.left
    });
  });
  localStorage.setItem('notes', JSON.stringify(allNotes));
}

let cursor = { x: null, y: null };
let note = { dom: null, x: null, y: null };

document.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('note')) {
    cursor = { x: event.clientX, y: event.clientY };
    note = {
      dom: event.target,
      x: event.target.offsetLeft,
      y: event.target.offsetTop
    };
    note.dom.style.position = 'absolute';
  }
});

document.addEventListener('mousemove', (event) => {
  if (note.dom == null) return;
  let currentCursor = { x: event.clientX, y: event.clientY };
  let distance = {
    x: currentCursor.x - cursor.x,
    y: currentCursor.y - cursor.y
  };
  note.dom.style.left = (note.x + distance.x) + 'px';
  note.dom.style.top = (note.y + distance.y) + 'px';
  note.dom.style.cursor = 'grab';
});

document.addEventListener('mouseup', () => {
  if (note.dom == null) return;
  note.dom.style.cursor = 'auto';
  note.dom = null;
  saveAllNotes();
});

