import { useQuery } from 'react-query'
import { countries } from '../src/GET-local_countries'

export default function CountriesList() {
    const { isLoading, isError, data, error } = useQuery('countries', countries, { refetchOnWindowFocus: false })

    if (isLoading) {return null}
    return (
        <>
            {data.countries.map((country)=>{
                return <option key={`${country.name}`} value={`${country.name}`}>{country.name}</option>
            })}
        </>
    )
}