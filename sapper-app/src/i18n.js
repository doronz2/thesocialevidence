const english = {
  title: "The Social Evidence",
  login: "Login",
  logout: "Logout",
  about: "About",
  newArticle: "New Article",
  search: "Search",
  create: "Create",
  title: "Title",
  aboutText:
    "The Social Evidence is an online publishing platform, with collaborative editing and fact checking of articles. Created by Doron Zarchy. Possibly will be run by Eyal Noam",
  editThisArticle: "Edit this Article",
  readPublishedVersion: "Read the published version",
  publish: "Publish",
  unpublish: "Unpublish",
};

const russian = {
  title: "The Social Evidence",
  login: "войти",
  logout: "выйти",
  about: "о сайте",
  newArticle: "новая статья",
  search: "поиск",
  create: "Создайте",
  title: "заглавие",
  aboutText:
    "Social Evidence - это платформа для онлайн-публикаций с совместным редактированием и проверкой фактов статей.",
  editThisArticle: "Редактировать эту статью",
  readPublishedVersion: "Прочитать опубликованную версию",
  publish: "Публиковать",
  unpublish: "Отменить публикацию",
};

const hebrew = {
  title: "הראיה החברתית",
  login: "כניסה",
  logout: "יציאה",
  about: "אודות",
  newArticle: "מאמר חדש",
  search: "חיפוש",
  create: "בניה",
  title: "כותרת",
  aboutText:
    " הראיה החברתית היא פלטפורמה לעריכה משותפת לבדיקת עובדות של מאמרים, אנשי ציבור, ודמויות בולטות בחברה הישראלית",
  editThisArticle: "ערוך את המאמר",
  readPublishedVersion: "קרא את המאמר שפורסם",
  publish: "פרסם",
  unpublish: "הסר פרסום",
};

let dict = english;
const lang = typeof window != "undefined" && window.location.host.split(".")[0];//deduce the location (ru/he/en) given the beggining of the url
if (lang == "ru") dict = russian;
if (lang == "he") dict = hebrew;

export default function i18n(key) {
  return dict[key] || `TODO: ${key}`;
}
