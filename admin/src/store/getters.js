/*
 * @Date: 2021-09-01 22:15:06
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-09-10 01:01:35
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  id: state => state.user._id,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_route: state => state.permission.routes
}
export default getters
