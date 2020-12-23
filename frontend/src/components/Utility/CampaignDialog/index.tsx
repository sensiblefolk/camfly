import React from 'react';
import { Dialog, DialogType, DialogContent, Stack, Text } from '@fluentui/react';
import { Skeleton, message, Button, Input, Tooltip } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';

const modalPropsStyles = { main: { maxWidth: 700 } };

const dialogContentProps = {
    type: DialogType.largeHeader,
};

type Props = {
    loading: boolean;
    hideDialog: boolean;
    campaignId: string;
    title?: string;
    toggleHideDialog: (ev?: any) => any;
};

const urlOrigin = window.location.origin;

export const CampaignDialog = ({ loading, hideDialog, toggleHideDialog, campaignId, title }: Props) => {
    const modalProps = React.useMemo(
        () => ({
            isBlocking: loading,
            styles: modalPropsStyles,
        }),
        [loading],
    );

    const webShareButton = () => {
        const { share } = navigator;
        if (share as any) {
            navigator
                .share({
                    title: 'Share Campaign',
                    text: title,
                    url: `${urlOrigin}/campaigns/${campaignId}`,
                })
                .then(() => message.success('Shared successfully'))
                .catch(() => console.log('cancelled'));
        }
    };

    return (
        <Dialog
            hidden={hideDialog}
            onDismiss={toggleHideDialog}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
        >
            <DialogContent>
                <Skeleton loading={loading} active round paragraph={{ rows: 3 }}>
                    <Stack tokens={{ childrenGap: 30 }} horizontalAlign="center" verticalAlign="center">
                        <img src="../../../../assets/success.png" width="100" height="100" alt="hooray" />
                        <Text variant="medium" style={{ width: 200, textAlign: 'center' }}>
                            Campaign created successfully, start sharing your campaign now!!
                        </Text>
                        <Stack horizontal>
                            <Input value={`${urlOrigin}/campaigns/${campaignId}`} readOnly />
                            <CopyToClipboard
                                text={`${urlOrigin}/campaigns/${campaignId}`}
                                onCopy={() => message.success('copied')}
                            >
                                <Button type="primary" style={{ backgroundColor: '#24AE5F', borderColor: '#24AE5F' }}>
                                    Copy
                                </Button>
                            </CopyToClipboard>
                        </Stack>
                        <Tooltip title="Share Campaign">
                            <Button
                                shape="circle"
                                className="depth4"
                                size="large"
                                onClick={webShareButton}
                                icon={<ShareAltOutlined />}
                                style={{ height: '40px', width: '40px' }}
                            />
                        </Tooltip>
                    </Stack>
                </Skeleton>
            </DialogContent>
        </Dialog>
    );
};
