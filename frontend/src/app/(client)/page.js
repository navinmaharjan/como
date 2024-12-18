import Advertisement from './components/Advertisement'
import Advertisement_2 from './components/Advertisement_2'
import Banner from './components/Banner'
import BestSelling from './components/BestSelling'
import Category from './components/Category'
import Featured from './components/Featured'

const ClientHomepage = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Featured />
      <Advertisement />
      <BestSelling />
      <Advertisement_2 />

    </div>
  )
}

export default ClientHomepage