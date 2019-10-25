import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Wallet } from './Wallet'

configure({ adapter: new Adapter() });

describe('Wallet', () => {
  const mockDeposit = jest.fn();
  const mockWithdraw = jest.fn();
  const props = { balance: 20, deposit: mockDeposit, withdraw: mockWithdraw };
  const wallet = shallow(<Wallet {...props} />);

  it('renders properly', () => {
    expect(wallet).toMatchSnapshot();
  });

  it('displays the balance from props', () => {
    expect(wallet.find('.balance').text()).toEqual('Wallet balance: 20');
  });

  it('creates an input to deposit or withdraw', () => {
    expect(wallet.find('.wallet-input').exists()).toBe(true);
  });

  describe('When the user types into the wallet input', () => {
    const userBalance = '25';

    beforeEach(() => {
      wallet.find('.wallet-input')
        .simulate('change', { target: { value: userBalance }});
    });

    it('updates the balance in the `state` and converts it to a number', () => {
      expect(wallet.state().balance).toEqual(parseInt(userBalance, 10));
    });

    describe('and the user wants to make a deposit', () => {
      beforeEach(() =>
        wallet.find('.btn-deposit').simulate('click'))

      it('dispatches the `deposit()` it recieves from props with the local balance', () => {
        expect(mockDeposit).toHaveBeenCalledWith(parseInt(userBalance, 10));
      });
    });

    describe('and a user wants to make a withdrawal', () => {
      beforeEach(() =>
        wallet.find('.btn-withdraw').simulate('click'));

      it('dispatches the `withdraw()` it recieves from props with the local balance', () => {
        expect(mockWithdraw).toHaveBeenCalledWith(parseInt(userBalance, 10));
      })
    })
  });
});