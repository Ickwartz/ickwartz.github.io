const mock_backendComm = jest.createMockFromModule("../backendCommunication");


mock_backendComm.mockImplementation(() => {
    const getMonthsAppointments = jest.fn()
        .mockResolvedValue([
            {training_id: 1, name: 'test', date: '2022-07-10', user_id: 1}
        ]);
    return {
        getMonthsAppointments
    };
  });

export {mock_backendComm};