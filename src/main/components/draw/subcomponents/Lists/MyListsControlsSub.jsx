import React, { useState } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';

const MyListsControlsSub = () => {
  const [isCollapseOpen, toggleCollapse] = useState(false);

  return (
    <div>
      <button
        className="btn btn-outline-info btn-sm mb-3"
        onClick={() => toggleCollapse(!isCollapseOpen)}
      >
        <i className="far fa-question-circle fa-2x" />
      </button>
      <Collapse isOpen={isCollapseOpen}>
        <Card>
          <CardBody>
            <table className="table table-striped table-borderless mt-3">
              <thead>
                <tr>
                  <th>Símbolo</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>
                      <i className="fa fa-plus text-success" />
                    </span>
                  </td>
                  <td>
                    <span>Adicionar um novo item</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="fa fa-trash text-danger" />
                  </td>
                  <td>
                    <span>Excluir um item</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="fa fa-times text-danger" />
                  </td>
                  <td>
                    <span>Excluir lista</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>
                      <i className="fas fa-check text-success" />
                    </span>
                  </td>
                  <td>
                    <span>Este item será sorteado</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>
                      <i className="fas fa-ban text-warning" />
                    </span>
                  </td>
                  <td>
                    <span>Este item não será sorteado</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default MyListsControlsSub;
