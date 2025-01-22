import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

const ConnectDisconnect = ({
  connector,
  activeChainId,
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask;
  activeChainId: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive: ReturnType<Web3ReactHooks["useIsActive"]>;
  error: Error | undefined;
  setError: Dispatch<SetStateAction<undefined>>;
}) => {
  const [desiredChainId, setDesiredChainId] = useState<number | undefined>(
    11155111
  ); //sepolia testnet

  useEffect(() => {
    if (
      activeChainId &&
      (!desiredChainId ||
        desiredChainId === undefined ||
        activeChainId != desiredChainId)
    ) {
      setDesiredChainId(activeChainId);
    }
  }, [desiredChainId, activeChainId]);

  const switchChain = useCallback(
    async (desiredChainId: number | undefined) => {
      setDesiredChainId(desiredChainId);

      try {
        await connector.activate(desiredChainId);
        setError(undefined);
      } catch (error: any) {
        setError(error);
      }
    },
    [connector, activeChainId, setError]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "1rem" }} />
      {isActive ? (
        error ? (
          <button onClick={() => switchChain(desiredChainId)}>
            Try again?
          </button>
        ) : (
          <button
            onClick={() => {
              if (connector?.deactivate) {
                connector.deactivate();
              } else {
                connector.resetState();
              }
              // setDesiredChainId(undefined);
            }}
          >
            Disconnect
          </button>
        )
      ) : (
        <button
          onClick={() => switchChain(desiredChainId)}
          disabled={isActivating || !desiredChainId}
        >
          {error ? "Try again?" : "Connect"}
        </button>
      )}
    </div>
  );
};

export default ConnectDisconnect;
