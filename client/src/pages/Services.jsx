import { useAuth } from "../store/auth"

export const Services = () => {

    const { serviceData } = useAuth()
    // console.log("service: ",serviceData);

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid grid-three-cols">
                {
                    serviceData.map((currElem) => {
                        const { _id, provider, description, service, price} = currElem
                        return (
                            <div className="card" key={_id}>
                                <div className="card-img">
                                    <img src="../images/design.png" alt="desginer" width="150" />
                                </div>
                                <div className="card-details">
                                    <div className="grid grid-two-cols">
                                        <p>{provider}</p>
                                        <p>{price}</p>
                                    </div>
                                    <h2>{service}</h2>
                                    <p>{description}</p>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </section>
    )
}