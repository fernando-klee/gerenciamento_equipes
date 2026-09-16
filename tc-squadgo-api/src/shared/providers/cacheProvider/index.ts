import { container } from 'tsyringe'

import IoredisCacheProvider from './implementations/IoredisCacheProvider'
import ICacheProvider from './interfaces/ICacheProvider'

container.registerSingleton<ICacheProvider>('CacheProvider', IoredisCacheProvider)
