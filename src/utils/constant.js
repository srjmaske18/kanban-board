export const UserRoleEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER : "member"
}

export const AvailableUserRole = Object.values(UserRoleEnum)

export const TaskStatusEnum = {
    TODO: "tod",
    IN_PROGRESS : "in_progress",
    DONE : "DONE"
}

export const AvailableTaskEnum = Object.values(TaskStatusEnum)