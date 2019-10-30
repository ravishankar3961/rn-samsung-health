declare module 'rn-samsung-health' {
  interface IOptionData {
    startDate: number
    endDate: number
  }
  interface ISourceDetails {
    group: string
    manufacturer: string
    model: string
    name: string
    uuid: string
  }
  interface IStepCountData {
    data: {
      count: number
      day_time: number
    }[]
    source: ISourceDetails
  }

  export const authorize: () => Promise<boolean>
  export const getDailyStepCount: (options: IOptionData) => Promise<IStepCountData[]>
  export const isAvailable: () => Promise<boolean>
  export const stop: () => void
}
