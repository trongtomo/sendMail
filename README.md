**_ Note this script only send mail using gmail _**

### Prepare Your google account to send mail

- Turn on 2 step vertification on your google account   
- Generate a new app password followed on this [link](https://myaccount.google.com/apppasswords)

### Config your .env 

- Change your email
- Using password above

### Edit you mail content, sender and receiver

- Config your message like [this](https://nodemailer.com/message/)
### Create a bat file with your node directories in it

Create txt file name whatever you want, for me is **ReportTwiceDaily**

[ReportTwiceDaily.txt]

```
cd C:\Your Directory\sendMail
node tasks

```

then change its extension to bat [ReportTwiceDaily.bat]

### Create new task scheduler

- Open Task Scheduler
- Create Basic Task
- Trigger Daily
- Recur every 2 days
- Action Start a Program
- Link to your [ReportTwiceDaily.bat]
- Done
