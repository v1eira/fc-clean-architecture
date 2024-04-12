import NotificationError from './notification.error'

export type NotificationErrorProps = {
  message: string
  context: string
}

export default class Notification {
  private errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this.errors.push(error)
  }

  messages(context?: string): string {
    let message = ''
    this.errors.forEach((error) => {
      if (error.context === context || !context)
        message += `${error.context}: ${error.message},`
    })
    return message
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors
  }

  notify(): void {
    if (this.hasErrors()) {
      throw new NotificationError(this.errors)
    }
  }
}
