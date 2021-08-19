import { ValueEntity } from "@lightbend/akkaserverless-javascript-sdk";

const usersEntity = new ValueEntity(
  [
    "users_domain.proto",
    "users_api.proto"
  ],
  "com.example.users.UsersService",
  "user-list",
  {
    includeDirs: ["./proto"],
    serializeFallbackToJson: true
  }
);

const pkg = "com.example.users.domain.";
const Cart = userEntity.lookupType(pkg + "User:ost");

usersEntity.setInitial(userId => UserList.create({ users: [] }));

usersEntity.setCommandHandlers({
  AddUser: addUser,
  GetUser: getUser
});

function addUser(payload, userList, ctx) {
    const existing = userList.users.find(user => {
        return payload.userId === user.userId;
    });

    if (existing) {
        ctx.fail("User Id already exists!");
    } else {
        userList.users.push(payload);
        ctx.updateState(userList);
    }

    return {};
}

function getUser(request, userList, ctx) {
    return userList.users.find(user => {
        return request.userId === user.userId;
    });
}

export default entity;