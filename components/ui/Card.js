export function Card({className='',children}){return <div className={`card ${className}`}>{children}</div>}
export function CardHeader({children}){return <div className="px-6 pt-6">{children}</div>}
export function CardContent({children}){return <div className="px-6 pb-6">{children}</div>}
