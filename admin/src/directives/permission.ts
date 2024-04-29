import type { App, Directive, DirectiveBinding } from 'vue';
import { userInfo } from '@/stores/modules/user';

/**
 * 验证权限
 * @returns {boolean} true | false
 */
export const hasPermission = (permCode: string) => {
  const { permissionList } = userInfo();

  return permissionList.some((n) => n === permCode);
};

const vAuth: Directive = {
  mounted(el: Element, binding: DirectiveBinding<any>) {
    const bindVal = binding.value;

    if (bindVal == undefined) return;

    if (!hasPermission(bindVal)) {
      el.remove();
    }
  },
};

export default {
  install(app: App) {
    app.config.globalProperties.$auth = hasPermission;
    app.directive('auth', vAuth);
  },
};
