const list = document.querySelector('.js-list');

function showMembers() {
  members.forEach(member => {
    const li = document.createElement('li');
    li.innerHTML = `${member.id}님 남은 커피: ${member.coffee}`;
    list.appendChild(li);
  });
}

function init() {
  loadMembers();
  showMembers();
  return;
}

init();
