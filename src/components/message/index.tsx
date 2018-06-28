const Styles = require('./index.less');

let messageItemId = 0;

const messageContainerId = 'fireball-ui-message';
const defaultDelayTime = 2500;

const messageItemElementId = () => `${messageContainerId}-${messageItemId++}`;

const messageContainerEl = () => {
  const el = document.createElement('div');
  el.id = messageContainerId;
  el.className = `${Styles.container}`;
  return el;
};

const messageItemEl = (type: string) => {
  const el = document.createElement('div');
  el.className = `${Styles.messageItem} ${Styles[type]}`;
  el.id = messageItemElementId();
  return el;
};

const messageItemContentEl = () => {
  const el = document.createElement('div');
  el.className = `${Styles.messageItemContent}`;
  return el;
};

const iconEl = () => {
  const el = document.createElement('div');
  el.className = `${Styles.icon}`;
  return el;
};

const textEl = (text: string) => {
  const el = document.createElement('div');
  el.className = `${Styles.text} `;
  el.innerText = text;
  return el;
};

const createMessageContainer = () => {
  if (!document.getElementById(messageContainerId)) {
    document.body.appendChild(messageContainerEl());
  }
};

const messageItem = (type: string, text: string) => {
  createMessageContainer();

  const msgEl = messageItemEl(type);
  const msgContentEl = messageItemContentEl();
  msgContentEl.appendChild(iconEl());
  msgContentEl.appendChild(textEl(text));
  msgEl.appendChild(msgContentEl);

  return document.getElementById(messageContainerId).appendChild(msgEl);
};

const showMessage = (el: Element) => {
  const element = el;
  setTimeout(() => {
    element.className += ` ${Styles.showMessage}`;
  }, 20);
};

const hideMessage = (el: Element, delay: number) => {
  const element = el;
  setTimeout(() => {
    const classNames = element.className.split(' ').filter((item: string) => item !== Styles.showMessage);
    classNames.push(Styles.hideMessage);
    element.className = classNames.join(' ');
    setTimeout(() => element.parentNode.removeChild(element), 300);
  }, delay || defaultDelayTime);
};

const animateMessage = (el: Element, delay: number) => {
  showMessage(el);
  hideMessage(el, delay);
};

const addMessage = (type: string, text: string, delay: number) => animateMessage(messageItem(type, text), delay);

const success = (text: string, delay?: number) => addMessage('success', text, delay);

const calcErrorText = (text: string) => {
  if (text && text.indexOf('EOF') !== -1) {
    return '操作失败，请重试';
  }
  return text;
};

const error = (text: string, delay?: number) => addMessage('error', calcErrorText(text), delay);

const warning = (text: string, delay?: number) => addMessage('warning', text, delay);

const Message = {
  success,
  error,
  warning,
};

export default Message;
