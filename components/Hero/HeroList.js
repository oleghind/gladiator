import React from 'react';
import { Button, Table } from 'antd';
import { connect } from 'react-redux';
import { columns } from './heroListTableColumns';
import { setActiveTab, updatePlayer, changeHero } from '../../actions';


class HeroList extends React.Component {
    constructor(props) {
        super(props);

        this.player = this.props.player;
    }

    selectHero = id => {
        this.player.activeHeroId = id;
        this.props.updatePlayer(this.player);
        this.props.changeHero(id);
        this.props.updateCurrentTab(1);
    };

    createHeroesList = heroes => {
        return heroes.map(hero => {
            return {
                key: hero.id,
                name: hero.name,
                level: hero.level,
                actions: <Button type="primary" size="small" onClick={() => this.selectHero(hero.id)}>
                    {'select'}
                </Button>
            };
        });
    };

    render() {
        const heroes = this.createHeroesList(this.player.heroes);

        return <Table columns={columns} dataSource={heroes} size="middle" pagination={false} />;
    }
}

const mapStateToProps = (state) => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    changeHero: (heroId) => dispatch(changeHero(heroId)),
    updateCurrentTab: (tab) => dispatch(setActiveTab(tab)),
    updatePlayer: (player) => dispatch(updatePlayer(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroList);
