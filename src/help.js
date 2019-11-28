import React from 'react';
import {
    Modal,
    Carousel,
    Button,
    Card,
    Col,
    Row,
    Icon,
} from 'antd';

class Help extends React.Component{
    constructor(props){
        super(props)
    }

    //functions for carousel modals
    guide1(){

        Modal.info({
            title:"Guide 1",
            content: (
                <Carousel arrows>
                    <div>
                        <p>Lesson 1: Buying Stocks</p>
                        <img src = "/img/b_1.gif" alt = "pie" height = "150" width = "250"></img>
                    </div>
                    <div>
                        <p>End lesson</p>
                    </div>
                 </Carousel>
            )
        });
    }

    guide2(){
        Modal.info({
            title:"Guide 2",
            content: (
                <Carousel arrows >
                    <div>
                        <p>Lesson 2: What are options ?</p>
                    </div>
                    <div>
                        <p>End Lesson</p>
                    </div>
                </Carousel>
            )
        });
    }

    guide3(){
        Modal.info({
            title:"Guide 3",
            content: (
                <Carousel arrows>
                    <div>
                        <p>Lesson 3: Buy High Sell Low</p>
                    </div>
                    <div>
                        <p>End of Lesson</p>
                    </div>
                </Carousel>
            )
        });
     }


    render(){

        return(

            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card 
                            title="Buying Stocks" 
                            cover = {
                               <img alt ="outsmart" src = "https://www.thestreet.com/files/tsc/v2008/defaultImages/thestreet-picks-stockpickr.jpg" width = "100" height = "200"/>
                            }
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide1()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            The Beginning
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Short Selling"
                            cover = {
                                <img alt ="outsmart" src = "https://i.udemycdn.com/course/750x422/2471182_20ec_4.jpg"   width = "100" height = "200"/>
                            }
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide2()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            What even is it?
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Options Contracts"
                            cover = {
                                <img alt ="outsmart" src = "https://s3.amazonaws.com/multistate.us/shared/hubspot/export/AdobeStock_67425246-1200px.jpeg"   width = "100" height = "200"/>
                            } 
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide3()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            You might need a lawyer... 
                        </Card>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card 
                            title="Exercise and Expiry"
                            cover = {
                                <img alt ="outsmart" src = "https://is2-ssl.mzstatic.com/image/thumb/Purple4/v4/90/37/b5/9037b5ac-701d-6e15-a56e-b13bff7c1602/Icon.png/1200x630bb.png"   width = "100" height = "200"/>
                            } 
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide1()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            When you work out and Die
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Call Option Buyers"
                            cover = {
                                <img alt ="outsmart" src = "https://images.unsplash.com/photo-1516055619834-586f8c75d1de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"    width = "100" height = "200"/>
                            }
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide2()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            (678) 999-8212
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Put Option Buyers"
                            cover = {
                                <img alt ="outsmart" src = "data:image/jpeg;base64,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"   width = "100" height = "200"/>
                            } 
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide3()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Put it on me! 
                        </Card>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card 
                            title="Puts vs Calls: Rights and Obligations"
                            cover = {
                                <img alt ="outsmart" src = "https://keydifferences.com/wp-content/uploads/2015/12/call-option-vs-put-option1.jpg" width = "100" height = "200"/>
                            } 
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide1()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Sunday! Sunday! Sunday!
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="What are Futures?"
                            cover = {
                                <img alt ="outsmart" src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEBUSEBIVFhUWFRYYFRYWFxUVFxUVGBYYGhgZGhYYHSggGBolGxoWIzIhJSkrLi4uGCAzODMuNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAQIDBAYAB//EAEAQAAIBAwMBBgQDBgUDBAMBAAECEQADIQQSMUEFBhMiUWEycYGRQqGxFCNSwdHwM2Jy4fEHFYIkY5KiF0PCFv/EABkBAQEBAQEBAAAAAAAAAAAAAAEAAgMEBf/EACYRAAICAQQCAwACAwAAAAAAAAABERICAxMhMUFRBBRhBZEVInH/2gAMAwEAAhEDEQA/AMP4dcEq54dJ4Vfcg+EVNld4dW/DrvDqgpKfh0vh1c8Ok8KmCKnh13h1b8OnC1SkDKfh04JVwWqUWa1BmSmEp2yrYs07waYCSmEp4t1aFmpBZpgJKXhUngURFinDT1pGWDPArvAooNPS/s1IArwKUWKKjTU4aakzAK8ClFiiv7NS/s1BQCfArjZor+zUn7PSUArwaTwaKnT002KAgF+FSG1RI2KabFRA026Tw6IGzTTZqAobKTZV42qYbVAlTbSbatG1TfDogJK+2uqx4ddVBSXvCrvCq0LdOFquMnsKfhUvhVd8GlFmqRgo+FXeDV8WKcLFUgDhYpws0QGnp409akIBws08WKIjTVINNVIQDVsVINPRFdLUyaWmSqChpakGloqulqVdLVYqAhdLUg0tFxpaeNLRcaAcaWnDS0aGlpw0tVx2wKNJThpKNDTUv7NVctsC/slJ+y0b/ZqQ6aq5bYEOlpp01Gzp6adPVcNsBnTUw6ejh09RtpqbmdsBnT1G2no22mqNtNTYzQCmxUbWKNNpqibT1WMvADmzTDZou2nqM6emQqCTZpps0UaxTDYokKgzwa6iPg11UhBYFqnizRBbFSLp68tj6FAcLNOFiiS6epF09VioDF09PGnooumqVdLVcaApdNUq6aii6WpV01VyoChpakXS0WXTVKunquNAQumqVdNRUaepBp6rjQFrpqkGmokLFPFii41Bo09PGnoiLFOFii5VB4sUvgUR8Gl8GqxVB3gUvgUQ8Gl8GqxVBvgV3gUS8Gk8GqwVBhsU06eivg002arlUFHT1GdPRc2aabFNwqBm09RNp6NmxUbWKbg8AI2nqJtPRtrFRNYpuZeAEbT1E2no21ioWsU3MvTAraeo209GWsVG1im5l6YH8Cuor4FdVcztlhdPUq6eiFrT5zir6WLf8P5tXgerB9RaTYFTT1KuloyCAIC4HqB/SnrEfAPsKN0doE2tKOpinjT0SW0P4Y+Q/rUxsp0n8v6U7hbYLWxU1rTDqY+k1bW0KkFselNzNCslkDoDSiyPSrwVY+HNPVV/h/M0XGpURF/h/OlW2JyJFXmI/gApDY/vNFhqVntoeFI+uKZ4NWwkV2ylZA8SqLNKLVWglO2VXChU8Kl8KrWyl2VXCpU8Ku8Kreyk21XKpV8Kk8Kre2k21XKpUNqk8Kre2mkU2CpVNumm1VsrSFabFUpm1UbWqvFajZarBUoNaqNrVX2WomWmwVKDWqiazRBlqJlpuFQe1moms0QZajZabhQoeDS1b20lVwoWbeogxP0qwNQfWvPNL2neYbvEbGARBnAqT/vFwEA3m5jEH+VfH+yvKPq04k9BDzUqtWCXtS+xAS8ZiYgcY67atpr74ALXiAQcwvQ/Kp/LwXsKM263fanhxzFYfTdsXIJe9j06xz0GCeKbb7xkkDx5JmB5cx7RPQ1wX8nozHJmEbs3QDnqY4qVbsVhb3eQKRN73IIAxnPrH9Ks9ndtvdBZLgKzzIk8zzxEV0x/kNLLolim4TNoHpSay9vtC6Sdr4B/y9fl1qHW9vtaBLXFMRgRMmt5fN08VLkXhCk14udKZf1irAYx9+awZ77Jnz5HxdPzob2j3oW9+IiZWJBzjMdM4BHqazj/ACGk3HP9HP8A19nqQcECnK0V553d7xMFKPcEiNvUkR6T6g0QPeJvHW34oXcxABESVHmAJHsa7fZxN0/TZzSg1nB2ncgn09xxMTxUv7fcx5+eMAzx7+9S+Xg/ZbTD1dWZ1fbJt83hPyBzjy8/EZ45pLuuvC3uNwgqDuAA5PH0HH1mn7WETDDbZpppKyi9oXi21bpJBgjbkfTmfYxVLXd4bqPtQ3WxliFVVJwPwndn3ER14o+5h6YbbNuTUTXfvXnWn7xahndn1KMkAKlsZDbjJkzjpj+WYLPeO4l0tvYbwJAKGcQDHTOD8qvuYGafp6fTWrHaLtm7dtC4LjBSAZYKMdcenv7VXtdv3GJ/etAPouc/0q+9pr2W3+mvN4GQGGDBM8RBP5VIrg9a84u9tRcMbiWHmM7uIwTt+WD6UOsd69Sp2/vAqttQJkbY+E4iBipfMxamC2z1kmo2NYfQ9rai6m7xGWMHcI83BCiZMGoe0NY7brbXWZYGBOTOOD7Uf5DT/QpHbNT2r2utodDn2zI+dZm/3uO7yjyzExnIB46nMfQ1n3uu42bSxhggba2DOQSOMe386F6rsh1RLl0rAMXbY2zAaYDcBtsT6TXny13m5k28scejddkd5zdaD8MgYVy2SQPw5yMxxzitBcvDaSDMT+VeY/8AerNi2wtoqFSFUxIMwCc/hysc1U1feHcSpuSNvwqyxn1OJ9YFddP5GeK6lHLNp+D1K3rEcwrAn2M80rNXjGn7RuKCZIX2mSJ6mprPeHcQGZgPXPv/ALc13XyuOUFJPXt9dXl9vWkid5NdR9zH0O1+mcftcLBmDH2+3NPtdvOCPPOOOZPSZ/vFZzX6O5aLBhw22eQT7Gi+l7vbrBuh9xHIPkAwpjrx5p+nrXHLDBLk02/ZoNF3sUDzQD6mOh5BHt1qZ+8JurElV6GCBnEVgr9xyqgIVj/LE/l8qL93r0JdW6DKgQCCJ3T0+n51y1dBY42S5FPKOTR6vXg5c4MQOCZHI9f7+tX9o8IzJ3xAwMBSI4/nQ7TXNxCEDoVM5AGMls/7Gn33DXBkmCJg9MyBjpA+f5148fjYp0FYyQN26yuCACs4DGZJ9SeBJpmm7x3LbrBACjA/SehMkn5mrQW1JLk7SQSjAfh4mAOg/wDt7UG7at295uWjhjMREY6CeJn7V6MMNO1amGoPR+z+2Gu2FuXDtDtDgEiFLQSJ5OD9JOYqjrb1i5sUXzKk7y8joSowMqMCY+1DOwOw/wBssJ4mtFqWIVWjMYGC0sMYAHr71p+xv+nlyZa/bKkQZsOd3HBbb+RArX18Vy3B0WOWRk7eiNwt4PmVT8U4MzHPUwKa/Z1uxfm5cZyA3wjcCxmPkACTPEj7+m6ruvpLSgB1sk4bzeGWnoqq7n9ar2O6mh5t6J7zEz4l25dRf/sQSP8AxrNG3w+DT0GZzux3hu3Uaxb0xukSZ2AmMgbmxLQcEkfTkH+z+79wS7MHwNovLItsFIkncSozxWi7O7NFoRbSzZB6ae0oP1uMJb5wKIpplmSNx6FyXI+RaY+kVvZx9GsdLFLnkymk7oISlw6q8HUfDYkWuOAxhQB0A/OtFpOyQqBN1xlChfO5YkAkwWiescmiQAHNNuX+grpt49Glil0ijp+zLVkk208xiSSzERgQzEkfIHqfU1fu6F7ah85+L1HpMcVd7KsW5ncGbnEwPv1oqRODXbHBQDygy12ytwZH5lT91iR7GaH6rsSy8ht6jGAV24PMbc/Wi/aFtEYm2/WCpnB9jFV1v+v9a45aWM9GuwBq+7DNu8LVbd3G62PII4DIZic5qpd7mMFgReEGcqJMzkyCeo+pmtQyDpUTsR0+uf1Gaw9FPooXlGE7QfWjy/smoOGUhVeIXIK7RBBjp8qo3dPffS22ZHs3Ec7rbggsAywVODkESG9K9JXVsOGP18w/r+dP/wC4mIdAQedp/k39aztR4Dbxfk8ha8FDG8xklWYKPhMfCekmJ+hrZ9jam2unQWvKMk7rcbnOeW9JHsc0Xu9j9n3FZGsqochmBNy3JBmcMBPvUWr7pWjbVNNca0F+ET4ixMnkzn51y1MHEEtJ+OTP96O0LiFVUqW25A/Jgesx86EaTRa5wb4Qm3xEgAkgxDMY6nqYmtT/AP4W2+w3LpDLHmUMxMAD8UxiOPyp+t7LW1pm81yYB2qr3DjqQqwxMT9a3jjgl7Zj6/lmX0guWd/iX1YsDsVDmZBHmBJ2z0/4oNqNTqLhVEw7SF3HGfc9cGq+qvapJZdLcWfhZlKEDiQGzJ+9XOwRqbtwPf0t3YuXYoVChQSGBYAcgcZra0qp5NHHHT4hlm53aZlYo6wsBtxJLGMwRgRn6/SgTdmKLbTJuBRGfLIJERE9DH0ov2v2lytpx5gfgIjnnj1mgf8A3Ib2t5ZsE7QDnj9TWsLtQaePhl3SOrLtAIYCNoOGiJrrli2PiXkeo6/X5VJZ0ttmOGgj4pOJBExwBgj3q2Ltu3aVdufoh5JyByJpeaXCN9IppcUDFpvp/wAV1G9OLTICzBSRxtOPzFdWNz8Lj0HNX3eK7f8ADbgHBMjOegHSfp6mq+r7tZAU2hBE7n2BiOYXwo594xRo9ikQx1d3AABc7FBJzDFQI59ZIquws21g6q/cwDFudp6fEFI4j3oXB3p+Eel7NTCC227qRdRiRAj4isDjoZHpREdhNctFG07LJyQbPnUD0kmfrVSz2haUS3jnaQED3Sir0EeYDg+gGY5puq7427fMLGCJLnjpn1P0+grUz0jdY7Ht/wBNrBIPi3rY6gNaYD/5Lmm//jjTBtzX7rCZI8i/oo/lQvVd+XeRZtknoTxnGB16dKhtantC/wAsLYOMiCcdAZPHy5qWnm/wxOmEb3cHQKCbly/EZl7YXMzDRj6+lDT2X2NabyWGvNxG+7cn6Bgpqax2MGab917zA5EkxjPWRxRzQoqDbbUKsfh8xP5e561tYNdthK8JEfZ+ouWxt0eht6ZSOWC2z9VUA/er4091x+/1LtxK29tpfuPMfvSqfUj5zn9MVMh65I6c5+fpmtLFLwUsk0mnt2p8K2q/5up+bHPSrSnqT/SqwYTzxzOP545nj0qVbon9M9BHHsPX3pItI49v1pWvR1+1UTqAcHBiR0xH2/5qPxSTJn3x/Q4/WoC696nKtVLZn+z6T8/Sp7fIABJMD05IH1pIPdi2oQsfxfoP95+1EaZZthVCjgACnTXVKDmzP94LW190YYfmIn+X3oQLvTP99a1PbljfZaOVzPoBz+VY64IyZOD74+/sPt8q55Lk3i+C0l0jj39en+9SC7OR/Oh6Xj7/ADw33I4pPHA/Tnj/AGn9KzBot3Fn1+f9/SoHxn+/tTBePPTr1+sAZ/5+qtcDTB/Kft+VQEb3/f6EYqEkAkqSp9UJH5cU+8Acc/Pj04x61WcexHTqZj0zUROe0Lq4DhucMI/MfzqX/vkf4tsieogj7/8ANC3cxkZ+hnPT8qY16B5TBHHv/WsvDF9o0smvIctdq2mOLgH1g/nBq6mtccPI98/nWOfaxO5QfceXPHIH61Bkf4d1lzENx7ZGK5vQXhmt1+UarV6ezd/xtPac+pWCftQte7eh8TeLJSeUXbtPT8QJ6etDl7U1Cjo46EZP9/SprXeNCfOpHuDI+1ZpqLobab7I+0+61rYfCNyRG0HwwDkYJAEDniqGm7D2hvGDtjAW2ZBngEzP2/nR612laf4XB/X7TU289D/OsWyXZqmL6M3Y7uacKB4WpPOdi+vuBXVpRfPr+VdTusttGTvd7rclgWZvQqehPWRIzVZ+2r97Nuwojq0/pifXrSaPR2rbCFkerbTyAJPsfT361bLmMDmcwcGMgiP616lp4LpHC+b7ZVXsm4+b16DBgDAg9J+vAnrVi12Vp0gmWPp13eg6xVkAmJJJjAGR7ebmY/kaksBUgQQTBnJ3SOpIk4H51qQgs6dVA8ibOOkQMwdoG6YAOc1YAGJM+54PTpwfY+tVlWT6nJIyQRxPvz0BqxavLkCRiBkZzwVyfQdBQJZskRIOInAAHqWgGpw+RE4HJ4xH1zVS1dEAYkmInqehH4jk+3PNEk7G1Lf/AKWABnIj1gAH6GqCkQOBiSTInkQx54HoR061L4wHLHEnaZ5gHkV1vsTURDWDmZn5ZiZgH0qvq9LeRALqEMcKSIJ9SAp4OOg+8CqCknW/A+Ic+8ZwMGJjnH6UrXognpx1B5mcfL6jpSWOzL+3cUIXbJkCAMkxnjrM9etD7Zm7DSQD5SOpG4QTMYyfmOaQkui7u/F5Zk5xJEASI55+nyqblsdI4iMHmYgDj7Uml0d24u63bJAnIESQOAcRkgfIVJp7Ts5toskSdqjiDGYxAP3j61QQ+zdk9SBzIYc+jcH1+tWtFrBbuBipYKCQBPORPHpPpzUa9l3wsi008wwXymOkQI/3pU7N1G4nY+0dDHmgnp655+eKoKQ63bqiB4Zkz1HIGelRHvEIEWiQT/Ev396C6/TOgBdCs/xDjyj32+v260l7S3lXc1ogDbkkYkZJIxM+gHNMsIQcHeBSB+6MkTtLCY4z96zWpvAZAIXzERB8omOMmnFgEEAQOACYj0gcmIqT9hvMoYWmYCTI/iHQDEemc0Ntj0UiQIiYMfISQRPTjMR+td4gaZmZ4hgcEetQ27ZugW7YkkAIDkAweBOTE/2amsdi6lRBssNpIEDp/p4j86IKRjmeQYHHxZBnp1MmIjqOtQ7+olZjqQCT6gdc9J/Wr79kaiJ8K4DnAjgdJAOPb+yN1KFTtuKQSFkMCDIjGYwJ54+vFBEn7SpPHp5dwBzn+fX+tdeMesR9hOYjnPWK7R2rtw7VtszDzMAd2zIxzIUweB0q03Y2p3GbDx0MiTJBJwZ5kx19qoYyDbuce3mwxE+09OarXLYyD6TJk8ev9KM3uw9SZiw08ziJ9OQfr/vQrWK1tyroUYDMiDI4PowwftQRRueSIIicjBgRg88Ux3nnn6/3/wAVOYmIEcgCRn0MkSDPyx6VVvpDdRHHp9pxFIEbHkiBOYMmcYn8+lJdudGUMeM9J9Caju7gRP0iMfP39qaxwDAPJEdPb51ARXtOhGJX6ggfQ00Pdt/A5gdAZHSMH9aa7iSInn+5/wCaUjHsOsTxH+3NQFkduagY2jH+Vv5Gkqr4h/zfQmK6ii9DbL2SWyq9ByInk8Rn5/r1qQX/AC4EkzOCMx9xJ9/9oEuiAJyJJ4BA/wDKTGWzzAiRxU65wFaADySIz6nE8j6H3rQktrUkEDMewET6fWQIj1mpLGpkSJgYAAY9TJEjzYPIJFQZJiSzHHmiJwZCgZPGfWZOIrRdg92NTqYcA27ZBzcEAyQCy21PmkTE49+aoKQZc1JiFOYztAxyRywnEn+8aPsvupdvAM6C1bxuNySxAHKg5iMZjrFaDs2xoNGxBvWzeUkuzuCyk5Pl4t/QVPru1Oz9QoF3UIy8gC66qfmFIDfWetaWIPIEHtnSaT93o1F25gF2krJk8jHvCwM4mkbvreBjw7YzEwxHU/x+3pI9PV/aDdl27fkti6REKjXIBAgFn3Qi9M8+hrOdm6F9ZebwUUDAPxBbYg7ZZiScjBycmBFXJcGhtd879whLdlCzTtGZieYLen5g9BRHRdki0p1PaFwO4yZAIWJPT4j/AJRgdKn02k0/Z9sMcufLujzMceVR+FcD7CScVie2u2bupaXK7AQVUBiqyT6AljAOYzB9ov8AoBTt3tx9SCACLQn92eXMSN/UE9Ixnriu7A7MbUOCRCD43yCOCFAPB5iOIHyNPsjs99ReVE3jaZdyIUDGSDkk5xyfbmtxrNRb0OnhF9kXq7nqep9SfQfIVJTyxfHRB272ili2LFtgrlcZyqTBMk8nOaB9idreEreFbXzHJIboMdcrxH1oFrdS9x2JUlj5i3q3mGQPiAicdODipdHb3sLSf4hIXaywNswGgwSB7H19JobKD0DsHXvftm46hQWIWARIBiYJ/uDVDW94il97ahSExOZkAE/iAjMf8UXAWxYx8NtCfchRJ+pP5mvPrd1iBcaJILPJtwGdctyQM9Z4J5rTcGUEe2+2Te2qwAAnA5ZjGMzGMfOK1vaQnTXB/wC0SPosj9BXnOqubcNtYNKyyg7jnkiBG4hcAklvavUNoK7T1EfcRRiLMEr7ekYMRzJ5+kg59T6mKN9z9dIa0Zn4wP4QYBGPfj1yaydvBK7oMKJIWMwDk+lTaLtAWLyXCFgORO2JmPEO4CMlmx64zg0Lhi+gn3m0Xg6nek/vPMhzhwRuAjg8MPl7Vpewe1BqLIMjesC4IjPQx0B/r6U7tzs4aiwyAwcMjejDI+h4PsTXnvY3aLaXUT7w6nErieeWH6g85rXTDtGh7R7y6uzde29i0NslW88OkYYQf+IIp1jvSl0+HqbKlZHEmDgglGGDMHBkVodVorGqRS4DrypyMHnI6eo9hPFBNR2J2aGKXHQMPiV70RjqCcCAfsauQ4Gazu+RF/QPzBgMeMGVP4v9Lc59SKn7G72I7eFqP3dwY3GVVjJHX4Tjj3jnFHdDp0tW1W18A4yXnk/ESSa88776lWvsy27ifu9r70KeKQYBAbkAE5MdKnwPZq+3u0dZYBdLVu5bAJkb9w/1LP5j8qy+v73eMPDu29M4OQp3bhESV88iOpxyPel7A733LO23fDXEONwHA4BXJkf5ffEQRWt0/ZWhvjxks2X38sFAJwcEcgwTg+tHZdHmbqpZioBlRt67hnAPJj3/AEqG6szgRnOMRHsJ6dDXo/aD9m2X8O8qI0TDJcEjqQ0Qw44NDu0LnZNxPjVJwHtpcDLGOi8exEcVmoyee32BbJx0xGPdhnmIpmoCkYOBxnPHT1+XvRPtbQW0YCxqA6zIKB0JgDkERk87eRQ+zIJnIMkldoG0KBMTE/7UEUzbIzmYwfnxz1pHQj8RP0iD7GPy+9WL2ZO4HkrgcegH8se9RxJhiJEGOP8A4j8vaZmDUAwScn8iw/Kupl1DuMq32f8A/kRXUkO08ACTuLZCnaSojMYJmQ2Zg5950PYndzUa6GVNlmQQ74DDOUIJmDwNo4PFAuz9U9lg4to5EEBx4igkcxjdHUsDFaJe/mtuI3nVZGNltJQY+cNEevPtTwRrl7O0HZ0NfYNdyVDQW9TttjAGJk8ZyJrNdv8AfTUXwwtjwrQJWARuZerMxIIEZ2iOvIrJvcdgxu3SwYkBrhYsxBKyxIkmSIJj59KdYtlo3Fi04A+It5zlhPxCY4OD1xTJE9u/CkggqQNirwAMCRMQQAB8sT5qkuM07oEQSWnDlSGBHmGBEY/Sap2huy2DIL7jiJ9iAV6Ayfh6zl+pZYMAjd8PJ3NI2wFEN5ixkcGOnAIc7t9jtrLy29wCgB3fYrSgI+Ejy7iSoB80AGvWtFordlAlpQqj7kxyxOWPGT6V4h2f2xcsuDZfbdChQeTBJkGRtYDGMzHSK1NrvzrFUT4TFSof92xJB5IFt/L19R+ZGk4BlrtzsPX3bzM9vxAW8rK6eRcAbFdoXBOecTk0ui7k6glfE8NAJJYw7gnkBVERk/iHA96rXu/2pAn9x+ICEMuwIHkm7/mX4o6+kVVv98dXc3qWKkEFQoC+XIyyiScAwDwRz1OC5N74mn0FnbxgsVEG5daMsQIkmOcCsH2p2y1+8Ll47VYHaoIhUGYB9cZbEyI6ChF/WCSbhIY/hYzJk8tE+8TxHrUeluPcQPtCjyghiASepLQY8vueI6VSQRshWPwt5yYby4JEEbTBmAcRwQZrV9xNKXJvMsbVUAmYLlckA9Apj/y9qxjHapl3AABJB85g8knAIJg46dKK6DvPqbFoLbQBA4wFDGGMlpMFj1Bx6YihCzZ9978aU2hzdYLEgeXk56fhH1rIrc2CJQZM8KcwY5JZh8o4z1qj2z2299//AFFwRbtqYCEAeI4yYYfEBt9p5M1Gzb7TtaIyxBE5k5ZWIMbsnIn74py5BEyWhhVG1ATuUEBRAhlgAQASwwcR7wPTOx9ct6yrDkAB1kEqw5Bj6/OvKdW25iVB3A7ihbcARO4eXzBSQwJAgy2Dmn6TtB12sjXQ8QY3Bt0gsG8MERH4ZjpJ5oTgWjb63u4y3XuW1VlfcdvlV1Jzyw2sJLc+uZ5oOe7WpyFtlc9Ht7ZMT7wDJMRxjmu0/fDUDykqx9SoiI9QQDnrUq98dSPiSyVKyCAQVgZBm55sg5wIp4Dk2uhseHaS2xkqiqTnMCOpJ+5rzfvufC1lzwkU7gheBkMxG4+kxDRzMVJqu+GpY5bbbBYE2lWRAjzMS3BVz5SDwINAL53l/iZiCSSXMnrmADMepmfWpskjTdxO8pW5+z35CXGAsk9H2SV+Rg543ERzWh7393xfQ3bSA31UgYEuvVc9eY+ZHWvMPEFpiAyAFsLt4byzkz6kkwOScyJPt361SkKblofDBa38U7eMyx+LEE5GcGpMCh2f21esMfBbwwGLMNu4MBzKzG6REbQZ64rYdnd8bV1AmstBQ34ts2yOhKnI/OK8/wC1Nc+oum4yrvjzFfKDnJBWQy8+nrycj7G1rYdtsTBBC8rjkZjMQcj26CE9Q1/dO1qEFzQ31UEgjPi2jxgQZTpwfpWafT67s+54h8oxudV3WrhhoDDcZHudpE4NAuz9a9nz2XuI8AsBuTICwCxxckn8W775oxb7+6/IPhkgeY7AwMj2jEkehzx1p4A23Z3aem7StC3etrviQpzmB5rbj2IyM561nu0e499G/wDTFbluIUMwV1zwSREe459BWVu657r+Iba27jLMoqorMIK4U5aV/COomcUaHfvVrbUblJBAbeFLRyfmdo6x/UlPsRbncrXSIRInzbmtliP9QYcU253F1YYstpcx+NQ3xTyGGAMQa5P+oGsIuRsJTgKklgOoJgSRBjgcT6IP+oOr2mXtbo8pFpoJ4zjkkgRjiZzVwUkNzuJrFUnwgcliFdM+wWcn+pjpQPU2ir+HcwQJbBEEGMhpIInG4fOtEO/mt8xD2iAJnwj8/iwD8/1jI/tfvA+qUHULYkDDlFV1BPlAYNMGOJg+lDggPvjEFo6y2fyrqnVWjyPb29N2T75DRzNJWZQ8lAk7TO0sRDZ8qRMAjkLkGBM8/J4APm2qpBQncU2swncApOCDAzzu5OaGh1Vt3mDAOQoCSoxAQbmzJYSJjzDkGrTshYQ+NvIlWYBTJPQkbiNxiN1dIMySXTvuyyDcpaSfKMScIDJ+L1E7TETI627b1JiWJB6KFAYchYgSAYk5jrhJugMZt5AKgkgwxADYjEk5WQQOoAqmpC+QurEsdgA5JlgQvMZHrBUNyAaiCr6rcTtYBlG3LEA5VXz/AAmeoiCCJmoGcNbYZzgyGIZsMYEZBMHA4Kj3qDYQTG3qHIc5mBGcKJzAMnPpNXdL5UUIcMQ4QmQBJmdskGADMnb8gKuhLGmkSGJO4Rt3CBE9ADl4Ez68evWbx8Q8kmRsM4cRJluP8MZxPHyrs+4Qu5FIEZG1o2idwAmNxyfb3pPBA3AHdBIA+IfFLGZgmZPJPlMzyIiZrsHyqJYqPLkL5SqyGws4HPp6VOyyQCPhJYiNhLDJPEqOCNv8I9M1LTbWk7+mAGuKCQIMAboAInzYJHUirzPtaDhVTcfibbvwCR7bJj2bqaiINFebaM7SXMxG7M7dzKBukZk+ntmQaQIWKg7miVLCPM25oUCM5OI5HGacXYrbKkgbVMgTIBPEyZPGTGCflY1WpBhiSC3xSxaATP8A5YIgzj9IhdReZlMheZO7EgAb+W8gkYyI3DMkCodbqzAYoCV8plYkkZnAAjr/AKT0ilvXvDlFuqfITBHmDbcFYkNIM8gdaqG+6K6gMw8jBmh98ycCSJVtwgCIU8xNSJl23dDF03Mok7S2IKgx0G4ncPMSGn5TVizqWAJZSCq4AZSxJkbIcQsgjr+LoOBXZfaTtutwZIlWKs22dqy27LGAfhGQYBzRB720Q3hu2WlQUEqJiSZYxv6qIJHTIyRNb7QRidwBKhCVGTziRBLeYiJIjIAFOdwbRO4cjbcIPmblvMYBAAbGQIHoaGftiSAXdiQw3AOBOBtkAbVPl4XM+xqxpwwQIqKJC9NssATAb2hlIMHPWqBktWwsbV3DaTz6gAkGBwYJJ4A6ipWvsAzQY2ggBlyYY7SWgYIMQRz0zNKw+COAMQvlJLFiogNEdMHG2eCIYm5HbyoUdVkAAkMu3G6cSIEEEgkVEWE19skiNrhCQAIKgjJAAy0mSZkkHqpqPVQ9toIAUqoMfEWIlWJxJJ9MfLis+pUHczZGbaruMAAEmAOfigtkkEQMCmaO9lvCWQxUCQd3mMtuJggjExMSDxQUklwpgpn4fiQOSsTbIMSSQYBg+pNQNaR33EqYVSAqmDPEEz06nEgfTixVcAAMMEY9RkgySfKDIwfmYcGyQDyxQmWI2QJEkS0EMenPTqgRtZYbhcCmPRY2COJOBO3pjA4qKxcZ1Idtu1SW3AtAYMR5mALTnP8AlHrNWtQoI2gblnrgyvG3f+GB69eJqtvcnYyMrhdxHrG5iN3VJlo9/Soid1VkK+IsMdwiBAG6ZnzAdDMZz8qX7MbQ3IPVSSC0rn4YO0dIxnEVIQvnG4KPKzHdGREgRkYnjiAcmIhRjhbhjYDJjnHmgOSW6DGM+uRASLMAN5GlxtYlJyDiYJ95I+fq9g9xg846Q0kDk42wfof60x7quWUgbTtKsudsNAgsBHXj0jAmqzanBhisDO8kKQTgjcBGMT0j2qIlJXbutiHIA4CzmWTdEcwZyARMjq6y77wCqqijcVyxLicMAMYj2wMZppublLCCOWMAtBAO1fMce8Aevu+1cRrYW4wIXGSqsCfUAx74M544oI61rRO0qYMhhtYQBIEhxuIn36n5U25cgwMSfLt3NiSPgPxZAM+1Nv6hRh23bj5Sdu5Y4G0SGHm/ITHJi0D3AALZAUBgpJU4bdI2AZA/y8R7zVASWGtFvNuOfl8uhiupbWkBE3EAYkkieMnjzDHtFdRIwUrGoDb99tFxnasFRAYqIJCxtMFRwxqBHdmO2TbmSZA2kyYA+IgA+p+VdXV0Iu2Q96FmCpWcIuVtgsZXqQZ6zuHEGu09h4LKGU2wQstvJktEmQI3tMAZzOIjq6syMCi25ko37svtVYUZLMD6kDLjEfUYpNeu24x3QILLHMv+8EGJRZC4HO3piFrqU5ZNcD9JcDkBSSACCCzShITaQxktLTiQMe+YWbJtGID7t3nIEL1Utz8WBj4v4s9XUgW/E8VSymbYK9Bn8Swr4CjMYkAiIyKl0JJukIqsQAHElIkGYbEmG3DpPXrXV1D4kVzBPqrxlhtXBWYkwJAkScEspHXj5GnE7CZQDaAH4MYnnPqx69a6uoEq3NUoncXO4lRESyjfC8wMEiT6Az0prD4Q1uWuCTLwwWQXXcBkRuzzn3x1dWjPZatag2lJtqPhG0/gU/iJSQfpnMnEzSpqmcb9yhWueXDSxAO7HRSTtg5M8iBXV1BSc1xQh8xJIWBHozAkTwZB68jnrVvUaVWUMw2bFLByFZVYNDwIk5npn0rq6h8CuRdFoHlSX3Mx3EHKgACQMCPKCOsTgmqGo7WFseERtJZ2yCWEAwQwYieBxx6UldTjyGXHRI7N+NgCUDwu6UBDSAekYJ5k8CnNcAurGf4jABBVIMSIJjH866uogSvqeztqxbbwwbm3aQAScHdvRTEgenQnmn6rRMFcgBwhBE4Y5aSTOZH6fSurqJGCvcuhlcnIHiE7jDQoEiQDxvUgAfiInmW+J8TMoMxAAHlMQCZ+XT5cfEtdWoMySaewrttzJIUQYiVzAiOI5jJ+1K2h8zGCIEmSAVCgkkZJIX+8UtdQXgS3aDEhibZBCuAqkEZieZDbZPWfnT3YLwWCx1MieTMeY8Nn+tdXVF4O0+3YDdLZja0JgNKjywdoO1sZ5z72dGrCWGVYAggKCIMEHr6Zg/F6CK6uoYoW5bdyxDKcgAFOGIkj4hMgHOIniqGmff5gS2cA8bSZaNzdDnpjpIrq6rww9E/hf+2D0kPEx7ACurq6sSag/9k=" width = "100" height = "200"/>
                            } 
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide2()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            A guide for Marty McFly
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card 
                            title="Intrinsic and Extrinsic Value"
                            cover = {
                                <img alt ="outsmart" src = "https://www.wrike.com/blog/content/uploads/2019/07/Intrinsic-vs.-Extrinsic-Motivation-How-to-Drive-People-to-Do-Amazing-Work-896x518.jpg"   width = "100" height = "200"/>
                            } 
                            actions = {[
                                <Icon type = "youtube"/>,
                                <Icon type = "info-circle" onClick = {() => this.guide3()}/>,
                                <Icon type = "ellipsis" />,
                            ]}
                        > 
                            Even I don't know what it is... 
                        </Card>
                    </Col>
                </Row>
            </div>     
        )
    }
}

export default Help;
