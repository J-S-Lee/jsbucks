function drinkCoffee(phone) {
  loadMembers();

  const changedMember = members.map(function(member) {
    member.id === phone ? member.coffee-- : member;
  });

  saveMembers();
}

function paintCoffee(memberInfo) {
  const resultDiv = document.createElement('div');
  const userSpan = document.createElement('span');
  const coffeeSpan = document.createElement('span');
  const commentSpan = document.createElement('span');

  const form = document.querySelector('phone__input');

  resultDiv.className = 'result__text';
  userSpan.innerHTML = `${memberInfo.id} 님`;
  coffeeSpan.innerHTML = `남은 커피 캡슐은 <strong${
    memberInfo.coffee < 1 ? ' class="redText"' : ''
  }>${memberInfo.coffee}</strong> 개 입니다.`;
  commentSpan.innerHTML = `${
    memberInfo.coffee < 1 ? '충전이 필요합니다.' : '좋은 하루 되세요.'
  }`;

  resultDiv.appendChild(userSpan);
  resultDiv.appendChild(coffeeSpan);
  resultDiv.appendChild(commentSpan);

  formContainer.removeChild(formContainer.childNodes[0]);
  formContainer.appendChild(resultDiv);

  setTimeout(function() {
    formContainer.removeChild(formContainer.childNodes[0]);
    paintForm();
  }, 5000);
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector('input');
  const value = input.value;

  const orderer = getMember(value);

  if (orderer.coffee > 0) {
    drinkCoffee(value);
  }

  paintCoffee(orderer);
}

function paintForm() {
  const input = document.createElement('input');
  const btn = document.createElement('button');

  input.placeholder = '010-0000-0000';
  input.type = 'tel';
  input.className = 'phone__input';
  input.pattern = `(010)\\d{8}`;
  input.required;
  input.minLength = 11;
  input.maxLength = 11;

  btn.className = 'phone__btn';
  btn.innerHTML = `<i class="fas fa-mug-hot fa-2x"></i>`;

  const form = document.createElement('form');
  form.addEventListener('submit', handleSubmit);
  form.appendChild(input);
  form.appendChild(btn);
  formContainer.appendChild(form);
}

function init() {
  loadMembers();
  paintForm();
}

init();
