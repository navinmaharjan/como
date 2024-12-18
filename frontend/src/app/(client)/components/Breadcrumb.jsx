'use client'

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Breadcrumb = () => {
    const pathname = usePathname()

    const generateBreadcrumbs = () => {
        const pathSegments = pathname.split('/').filter(segment => segment)
        const breadcrumbs = [{ href: '/', label: 'Home' }]

        pathSegments.forEach((segment, index) => {
            // Decode the segment and replace % with -
            const decodedSegment = decodeURIComponent(segment).replace(/%/g, '-')
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`
            const label = decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1).replace(/-/g, ' ')
            breadcrumbs.push({ href, label })
        })

        return breadcrumbs
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <Breadcrumbs size="sm">
            {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={crumb.href}>
                    {index === breadcrumbs.length - 1 ? (
                        crumb.label
                    ) : (
                        <Link href={crumb.href}>{crumb.label}</Link>
                    )}
                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    )
}

export default Breadcrumb
