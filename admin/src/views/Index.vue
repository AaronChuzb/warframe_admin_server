<!--
 * @Date: 2021-08-23 11:32:08
 * @LastEditors: AaronChu
 * @LastEditTime: 2021-08-23 18:28:50
-->
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent app prominent>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-group v-for="(item, index) in menuList" :key="index" :prepend-icon="item.icon">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="(subItem, index) in item.items" :key="'child' + index" :to="item.path + subItem.path" class="pl-6">
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <!-- 给应用提供合适的间距 -->
      <v-container fluid>
        <!-- 如果使用 vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      menuList: [
        {
          title: "内容管理",
          path: "/warframe",
          icon: "mdi-content-save-edit",
          items: [
            {
              title: "列表",
              path: "/list",
              icon: "mdi-view-list",
            },
            {
              title: "新增",
              path: "/edit",
              icon: "mdi-new-box",
            },
          ],
        },
        {
          title: "系统设置",
          path: "/user",
          icon: "mdi-account-cog",
          items: [
            {
              title: "列表",
              path: "/list",
              icon: "mdi-view-list",
            },
            {
              title: "新增",
              path: "/edit",
              icon: "mdi-new-box",
            },
          ],
        },
      ],
      mini: false,
    };
  },
};
</script>

<style></style>
