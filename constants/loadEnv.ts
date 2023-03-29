import * as dotEnv from 'dotenv'
dotEnv.config()

export default function loadEnv(envName: string, required = false): string {
    const value = process.env[envName]
    if (required && value === undefined && ! process.env.DEV) {
        console.error(`Environment variable ${envName} not presented, but required`)
        process.exit(1)
    }
    return value as string
}