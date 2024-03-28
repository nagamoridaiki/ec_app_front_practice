/**
 * navigation
 *
 * @package constants
 */

/**
 * リンク先一覧
 * 遷移先定義の際に使用
 */
export const NAVIGATION_LIST = {
  SIGNIN: '/',
  SIGNUP: '/signup',
  TOP: `/product`,
  DETAIL: `/product/detail/:id`,
  CREATE: `/product/create`,
  EDIT: `/product/edit/:id`,
};

/**
 * パス一覧
 * 画面遷移時の使用
 */
export const NAVIGATION_PATH = {
  SIGNIN: '/',
  SIGNUP: '/signup',
  TOP: `/product`,
  DETAIL: `ec/detail/`,
  CREATE: `ec/create`,
  EDIT: `ec/edit/`,
};
