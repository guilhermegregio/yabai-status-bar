import map from 'lodash/fp/map';
import get from 'lodash/fp/get';
import { parse } from './helpers.jsx';

export const command = 'sh yabai-status-bar/scripts/desktop.sh 2';

export const refreshFrequency = false;

export const className = `
  color: #a8a8a8;
  font-family: Helvetica Neue;

  .desktop {
    align-items: center;
    color: #a8a8a8;
    display: flex;
    font-family: Helvetica Neue;
    font-size: 14px;
    height: 23px;
    margin-left: 20px;
  }
`;

const mapWithIndex = map.convert({ cap: false });

const iconList = ['fab fa-chrome', 'fab fa-slack', 'fas fa-desktop'];

export const render = ({ output }) => {
  let data = parse(output);

  return (
    <div className="desktop">
      {mapWithIndex((workspace, index) => (
        <div
          key={index}
          style={{
            marginRight: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i
            className={
              index >= iconList.length
                ? iconList[iconList.length - 1]
                : iconList[index]
            }
          />
          {workspace.visible === 1 && (
            <div
              style={{
                height: 1,
                backgroundColor: '#bab72d',
                width: 32,
                top: 23,
                alignSelf: 'bottom',
                position: 'absolute',
              }}
            />
          )}
        </div>
      ))(get('workspaces')(data))}
    </div>
  );
};
