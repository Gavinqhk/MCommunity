const Mock = require("mockjs");

const List = [];
const UserList = [];
const AppList = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      name: "@ctitle",
      appCode: "@id",
      appName: "@cword(5, 10)",
      userNum: "@integer(300, 5000)",
      createUser: "@cname",
      "banned|1": true,
      updateTime: "@datetime",
    })
  );
}

for (let i = 0; i < 5; i++) {
  UserList.push(
    Mock.mock({
      id: "@increment",
      name: "@ctitle",
    })
  );
}

for (let i = 0; i < 5; i++) {
  AppList.push(
    Mock.mock({
      id: i + 1,
      name: "@ctitle",
      appCode: "@increment",
      updateTime: "@datetime",
      "banned|1": true,
    })
  );
}

module.exports = [
  // 角色列表 分页
  {
    url: "/roles/page",
    type: "get",
    response: (config) => {
      const { banned, keyword, page = 1, size = 10 } = config.query;
      let mockList = List.filter((item) => {
        if (banned && item.banned !== banned) return false;
        if (keyword && item.name.indexOf(keyword) < 0) return false;
        return true;
      });
      const pageList = mockList.filter(
        (item, index) => index < size * page && index >= size * (page - 1)
      );
      return {
        code: 200,
        message: "请求成功",
        data: {
          total: mockList.length,
          rows: pageList,
        },
      };
    },
  },
  // 创建角色
  {
    url: "/roles",
    type: "post",
    response: {
      code: 200,
      data: {
        id: Mock.mock("@integer(300, 5000)"),
      },
      message: "请求成功",
    },
  },
  // 修改角色
  {
    url: "/roles/.*",
    type: "put",
    response: {
      code: 200,
      data: {},
      message: "请求成功",
    },
  },
  // 拥有该角色的用户列表
  {
    url: "/roles/.*/users",
    type: "get",
    response: (config) => {
      const { roleId } = config.query;
      if (roleId) {
        return {
          code: 200,
          message: "获取角色用户列表成功",
          data: UserList,
        };
      } else {
        return {
          code: 500,
          message: "获取角色用户列表失败",
          data: {},
        };
      }
    },
  },
  // 角色详情
  {
    url: "/roles/.*/info",
    type: "get",
    response: (config) => {
      const { roleId } = config.query;
      if (roleId) {
        return {
          code: 200,
          message: "获取角色信息成功",
          data: Mock.mock([
            {
              id: "@increment",
              name: "@first",
              "appCode|1-5": 5,
              appName: "@title(5, 10)",
              "banned|1": [false, true],
            },
          ]),
        };
      } else {
        return {
          code: 500,
          message: "获取角色信息失败",
          data: {},
        };
      }
    },
  },
  // 批量授权
  {
    url: "/roles/grant",
    type: "post",
    response: {
      code: 200,
      data: {},
      message: "请求成功",
    },
  },
  // 删除角色
  {
    url: "/roles/.*",
    type: "delete",
    response: {
      code: 200,
      data: {},
      message: "请求成功",
    },
  },
  // 查询某用户有权限的资源列表（树）
  {
    url: "/resources/modules",
    type: "get",
    response: {
      code: 200,
      data: {},
      message: "请求成功",
    },
  },
  // 查询系统列表
  {
    url: "/apps",
    type: "get",
    response: {
      code: 200,
      data: AppList,
      message: "请求成功",
    },
  },
];
