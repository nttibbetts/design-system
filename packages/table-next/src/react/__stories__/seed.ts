import faker from 'faker'

faker.seed(666)

export const generateUserCourseViews = (rows = 20) =>
  new Array(rows).fill(null).map(() => ({
    courses: { active: faker.random.number(30) },
    user: generateUser(),
    viewTime: generateViewTime()
  }))

export const generateViewTime = () => ({ ms: faker.random.number(1000) })

export const generateUser = () => ({
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
})
