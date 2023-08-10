import { Fragment, useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Link } from 'react-router-dom'
import { Button, Col, Collapse, Row } from 'reactstrap'

interface SidebarProps {
  status: boolean
  icon: JSX.Element
  title: string
  route?: string
  childrenItem?: Array<{ title?: string; route: string; icon?: JSX.Element }>
}

const decideContent = ({ status, icon, title, childrenItem, route }: SidebarProps) => {
  const [childrenIsOpen, setChildrenIsOpen] = useState(false)

  const handleCollapse = () => {
    return (
      childrenItem !== undefined && childrenItem.length !== 0 && setChildrenIsOpen(!childrenIsOpen)
    )
  }

  if (status) {
    return (
      <Fragment>
        <Button
          color=""
          tag={Link}
          to={childrenItem?.length !== 0 ? '' : route}
          className="d-flex justify-content-center align-items-center text-white w-100 py-3 border-0 on-hover"
          onClick={handleCollapse}>
          <Row className="w-100">
            <Col className="p-0 m-0">
              <div>{icon}</div>
            </Col>
            <Col>
              <span className="w-100 text-center fw-bold m-0 p-0">{title}</span>
            </Col>
            <Col className="p-0 m-0">
              {childrenItem !== undefined && childrenItem.length !== 0 && (
                <Fragment>
                  {childrenIsOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                </Fragment>
              )}
            </Col>
          </Row>
        </Button>
        <Collapse isOpen={childrenIsOpen}>
          {childrenItem !== undefined &&
            childrenItem.length !== 0 &&
            childrenItem.map((item, index) => (
              <Button
                key={index}
                color=""
                tag={Link}
                to={item.route}
                className="d-flex justify-content-center align-items-center text-white w-100">
                <Row className="w-100">
                  <Col>
                    <div>{item?.icon}</div>
                  </Col>
                  <Col>
                    <span>{item.title}</span>
                  </Col>
                  <Col></Col>
                </Row>
              </Button>
            ))}
        </Collapse>
      </Fragment>
    )
  }
  return (
    <div className="d-flex justify-content-center align-items-center py-3 text-white">{icon}</div>
  )
}
export default function SidebarProps(props: SidebarProps) {
  return <Fragment>{decideContent(props)}</Fragment>
}
