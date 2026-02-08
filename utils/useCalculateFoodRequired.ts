import type { Animal } from '~/types'

export default (animal: Animal): number => {

  // 5. If the animal is a fish: The required food is 0 kg
  if(animal.species == 'fish') return 0

  // 1. Take height + weight and divide it by 250
  let dailyReq = (animal.height + animal.weight) / 250

  const age = useCalculateAgeInYears(new Date(animal.birthdate))

  // 2. If the animal is:
  //     - older than 20 years, half the required food,
  //     - younger than 2 years, double the required food
  if(age > 20) dailyReq /=2
  else if(age < 2) dailyReq *= 2

  // 3. Cherrys have less calories, so if the favourite fruit of the animal are cherries, add 28 kg
  if(animal.favouriteFruit === 'cherry') dailyReq += 28

  // 4. If the animal is male, add 20 %
  if (animal.gender === 'male') dailyReq *= 1.2

  // Calculate days in the next month
  const today = new Date()
  const daysInNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate()

  return Number((dailyReq * daysInNextMonth).toFixed(2))
}
